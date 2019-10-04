import { Container } from 'inversify';
import 'reflect-metadata';
import { HttpServer } from './servers/http-server';
import { SocketServer } from './servers/socket-server';

export class Application {
  private readonly container: Container = new Container({ autoBindInjectable: true });

  initialize(): void {
    this.container.bind<HttpServer>(HttpServer).to(HttpServer).inSingletonScope();
    this.container.bind<SocketServer>(SocketServer).to(SocketServer).inSingletonScope();
  }

  async start(): Promise<void> {
    const httpServer = this.container.get<HttpServer>(HttpServer);
    const socketServer = this.container.get<SocketServer>(SocketServer);

    await httpServer.initialize();
    await socketServer.initialize();

    httpServer.listen();
  }
}

const application = new Application();
application.initialize();
application.start();
