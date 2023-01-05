import { Logger, UsePipes } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { IsEnum, IsNumber, IsUUID } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { Guid } from '../../../models/guid';
import { GatewayValidationPipe } from '../../../pipes/gateway-validation.pipe';
import { createGatewayMetadata } from '../../../utils/gateway';
import { PlayerService } from '../../player/services/player.service';
import { SessionLanguage } from '../models';
import { ClientToServerEvents, ServerToClientEvents } from '../models/events';
import { PlayerListItem } from '../models/player-list-item';
import { SessionConfiguration } from '../models/session-configuration';
import { SessionService } from '../services/session.service';

class SessionConfigurationDto implements SessionConfiguration {
  @IsEnum(SessionLanguage)
  language!: SessionLanguage;

  @IsNumber()
  maxPlayers!: number;

  @IsNumber()
  roundTimeInSeconds!: number;

  @IsNumber()
  roundsToPlay!: number;
}

class SessionIdDto {
  @IsUUID()
  id!: Guid;
}

@WebSocketGateway(createGatewayMetadata())
@UsePipes(GatewayValidationPipe)
export class SessionGateway implements OnGatewayInit, OnGatewayDisconnect {
  private readonly logger = new Logger(SessionGateway.name);

  constructor(private readonly sessionService: SessionService, private readonly playerService: PlayerService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.logger.log('Ready');
  }

  @SubscribeMessage<ClientToServerEvents>('create-session')
  async handleCreateSession(@ConnectedSocket() socket: Socket, @MessageBody() payload: SessionConfigurationDto): Promise<Guid> {
    return await this.sessionService.createSession(payload, socket.id);
  }

  @SubscribeMessage<ClientToServerEvents>('join-session')
  async handleJoinSession(
    @ConnectedSocket() socket: Socket<any, ServerToClientEvents>,
    @MessageBody() payload: SessionIdDto,
  ): Promise<SessionConfiguration | undefined> {
    const result = await this.sessionService.joinSession(payload.id, socket.id);

    if (!result) {
      // TODO: Error handling
      return;
    }

    const { session, player } = result;

    socket.join(session.id);
    socket.to(session.id).emit('player-join-session', { id: player.id, name: player.name });

    return {
      roundsToPlay: session.roundsToPlay,
      roundTimeInSeconds: session.roundTimeInSeconds,
      maxPlayers: session.maxPlayers,
      language: session.language,
    };
  }

  @SubscribeMessage<ClientToServerEvents>('player-list')
  async handlePlayerList(@MessageBody() payload: SessionIdDto): Promise<PlayerListItem[]> {
    return await this.sessionService.playerList(payload.id);
  }

  @SubscribeMessage<ClientToServerEvents>('update-session-configuration')
  async handleUpdateSessionConfiguration(
    @ConnectedSocket() socket: Socket<any, ServerToClientEvents>,
    @MessageBody() payload: SessionIdDto & { configuration: SessionConfigurationDto },
  ): Promise<boolean> {
    const result = await this.sessionService.updateSessionConfiguration(payload.id, socket.id, payload.configuration);

    if (!result) {
      return false;
    }

    socket.to(payload.id).emit('update-session-configuration', payload.configuration);

    return true;
  }

  @SubscribeMessage<ClientToServerEvents>('start-game')
  async handleStartGame(
    @ConnectedSocket() socket: Socket<any, ServerToClientEvents>,
    @MessageBody() payload: SessionIdDto,
  ): Promise<boolean> {
    const result = await this.sessionService.startGame(payload.id, socket.id);

    if (result) {
      socket.to(payload.id).emit('start-game');
    }

    return result;
  }

  async handleDisconnect(socket: Socket): Promise<void> {
    await this.disconnectPlayerFromAllSessions(socket);
  }

  private async disconnectPlayerFromAllSessions(socket: Socket<any, ServerToClientEvents>) {
    const disconnectInfo = await this.sessionService.disconnectPlayerFromAllSessions(socket.id);

    if (!disconnectInfo) {
      return;
    }

    disconnectInfo.sessions.forEach(sessionId => socket.to(sessionId).emit('player-leave-session', disconnectInfo.player));
  }
}
