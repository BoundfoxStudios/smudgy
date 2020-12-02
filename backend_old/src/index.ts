import { Container, interfaces } from 'inversify';
import 'reflect-metadata';
import { DiTypes } from './models/di-types';
import { HttpServer } from './servers/http-server';
import { SocketServer } from './servers/socket-server';
import { GameSession, gameSessionFactory } from './services/game-session';
import { IdService } from './services/id.service';
import { PlayersService } from './services/players.service';
import { SessionsService } from './services/sessions.service';

export class Application {
  private readonly container: Container = new Container({ autoBindInjectable: true });

  initialize(): void {
    this.container
      .bind<HttpServer>(HttpServer)
      .to(HttpServer)
      .inSingletonScope();
    this.container
      .bind<SocketServer>(SocketServer)
      .to(SocketServer)
      .inSingletonScope();
    this.container
      .bind<IdService>(IdService)
      .to(IdService)
      .inSingletonScope();
    this.container
      .bind<PlayersService>(PlayersService)
      .to(PlayersService)
      .inSingletonScope();
    this.container
      .bind<SessionsService>(SessionsService)
      .to(SessionsService)
      .inSingletonScope();
    this.container.bind<interfaces.Factory<GameSession>>(DiTypes.gameSessionFactory).toFactory(gameSessionFactory);
  }

  start(): void {
    const httpServer = this.container.get<HttpServer>(HttpServer);
    const socketServer = this.container.get<SocketServer>(SocketServer);

    socketServer.initialize();

    httpServer.listen();
  }
}

const application = new Application();
application.initialize();
application.start();
