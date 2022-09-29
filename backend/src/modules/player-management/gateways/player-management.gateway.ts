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
import { createPlayerManagementGatewayMeta } from '../utils';

@WebSocketGateway(createPlayerManagementGatewayMeta)
export class PlayerManagementGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  private readonly logger = new Logger(PlayerManagementGateway.name);

  @SubscribeMessage('login')
  handleLogin(
    @ConnectedSocket() socket: Socket,
    @MessageBody()
    payload: {
      id: string;
      name: string;
    },
  ): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(map(d => ({ event: 'login2', data: d })));
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
