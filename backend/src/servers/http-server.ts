import * as http from 'http';
import { injectable } from 'inversify';
import * as restify from 'restify';
import { Server } from 'restify';
import * as restifyCorsMiddleware from 'restify-cors-middleware';
import { Options } from 'restify-cors-middleware';
import * as nodeDebug from 'debug';

const debug = nodeDebug('smudgy:HttpServer');

@injectable()
export class HttpServer {
  private server: Server;

  constructor() {
    this.server = restify.createServer();

    const corsMiddleware = restifyCorsMiddleware({
      origins: ['http://localhost:4200', 'https://smudgy-web.herokuapp.com/'],
    } as Options);
    this.server.pre(corsMiddleware.preflight);
    this.server.use(corsMiddleware.actual);

    this.server.use(restify.plugins.bodyParser());
    this.server.use(restify.plugins.queryParser({ mapParams: true }));
  }

  get httpServer(): http.Server {
    return this.server.server;
  }

  listen(): void {
    const port = process.env.PORT || 8080;
    this.server.listen(port, () => debug('Server is up and running on port %s', port));
  }
}
