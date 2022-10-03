import { Logger, UsePipes } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { IsString, IsUUID } from 'class-validator';
import { Server, Socket } from 'socket.io';
import { GatewayValidationPipe } from '../../../pipes/gateway-validation.pipe';
import { Guid } from '../../../models/guid';
import { createGatewayMetadata } from '../../../utils/gateway';
import { PlayerService } from '../services/player.service';

class LoginDto {
  @IsUUID()
  id!: Guid;

  @IsString()
  name!: string;
}

@WebSocketGateway(createGatewayMetadata())
@UsePipes(GatewayValidationPipe)
export class PlayerGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PlayerGateway.name);

  constructor(private readonly playerService: PlayerService) {}

  @SubscribeMessage('login')
  async handleLogin(@ConnectedSocket() socket: Socket, @MessageBody() payload: LoginDto): Promise<boolean> {
    await this.playerService.login(payload.id, payload.name, socket.id);
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  afterInit(server: Server): void {
    this.logger.log('Ready');
  }

  handleConnection(socket: Socket): void {
    this.logger.log(`Socket connected: ${socket.id}`);
  }

  handleDisconnect(socket: Socket): void {
    this.logger.log(`Socket disconnected: ${socket.id}`);
  }
}
