import { Logger, UsePipes } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { IsEnum, IsNumber } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { Guid } from '../../../models/guid';
import { GatewayValidationPipe } from '../../../pipes/gateway-validation.pipe';
import { createGatewayMetadata } from '../../../utils/gateway';
import { SessionLanguage } from '../models';
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

@WebSocketGateway(createGatewayMetadata())
@UsePipes(GatewayValidationPipe)
export class SessionGateway implements OnGatewayInit {
  private readonly logger = new Logger(SessionGateway.name);

  constructor(private readonly sessionService: SessionService) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.logger.log('Ready');
  }

  @SubscribeMessage('create-session')
  async handleCreateSession(@ConnectedSocket() socket: Socket, @MessageBody() payload: SessionConfigurationDto): Promise<Guid> {
    return await this.sessionService.createSession(payload, socket.id);
  }

  /*handleJoinSession(): Promise<SessionConfiguration> {}

  handlePlayerList(): Promise<PlayerListItem[]> {}

  handleUpdateSessionConfiguration(): Promise<void> {}*/
}
