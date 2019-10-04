import * as http from 'http';
import { injectable } from 'inversify';
import * as restify from 'restify';
import { Server } from 'restify';
import * as restifyCorsMiddleware from 'restify-cors-middleware';
import { Options } from 'restify-cors-middleware';

@injectable()
export class HttpServer {
  private server: Server;

  constructor() {
    this.server = restify.createServer();

    const corsMiddleware = restifyCorsMiddleware({
      origins: [
        'http://localhost:4200',
        'https://smudgy-dev.azurewebsites.net',
        'https://smudgy.azurewebsites.net',
      ],
    } as Options);
    this.server.pre(corsMiddleware.preflight);
    this.server.use(corsMiddleware.actual);

    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.queryParser({ mapParams: true }));
  }

  get httpServer(): http.Server {
    return this.server.server;
  }

  async initialize(): Promise<void> {

  }

  listen(): void {
    // TODO: dynamic port
    this.server.listen(8080, () => console.log('server is up and running on port 8080'));
  }
}
