import { Logger } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { from, map, Observable } from 'rxjs';
import { Server, Socket } from 'socket.io';
import { PlayerManagementService } from '../services/player-management.service';
import { createPlayerManagementGatewayMeta } from '../utils';

@WebSocketGateway(createPlayerManagementGatewayMeta)
export class PlayerManagementGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PlayerManagementGateway.name);

  constructor(private readonly playerManagementService: PlayerManagementService) {}

  @SubscribeMessage('login')
  handleLogin(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    payload: {
      id: string;
      name: string;
    },
  ): Observable<WsResponse<boolean>> {
    return from(this.playerManagementService.login(payload.id, payload.name, socket.id)).pipe(map(() => ({ event: 'login', data: true })));
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
