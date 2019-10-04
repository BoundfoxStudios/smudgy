import { inject, injectable } from 'inversify';
import * as socketIo from 'socket.io';
import { Server } from 'socket.io';
import { HttpServer } from './http-server';

@injectable()
export class SocketServer {
  private server: Server;

  constructor(@inject(HttpServer) private readonly httpServer: HttpServer) {
    this.server = socketIo(this.httpServer.httpServer);
  }

  async initialize(): Promise<void> {
    // TODO: assign events
  }
}
