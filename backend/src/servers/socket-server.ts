import { inject, injectable } from 'inversify';
import * as socketIo from 'socket.io';
import { Server, Socket } from 'socket.io';
import { PlayersService } from '../services/players.service';
import { SessionsService } from '../services/sessions.service';
import { HttpServer } from './http-server';

@injectable()
export class SocketServer {
  private server: Server;

  constructor(
    @inject(HttpServer) private readonly httpServer: HttpServer,
    @inject(PlayersService) private readonly playersService: PlayersService,
    @inject(SessionsService) private readonly sessionsService: SessionsService,
  ) {
    this.server = socketIo(this.httpServer.httpServer);
  }

  async initialize(): Promise<void> {
    await this.playersService.initialize(this);
    await this.sessionsService.initialize(this);
  }

  on(event: string, listener: (socket: Socket) => void): void {
    this.server.on(event, listener);
  }
}
