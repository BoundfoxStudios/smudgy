import * as nodeDebug from 'debug';
import { inject, injectable } from 'inversify';
import { ResultFn, socketOn } from '../helpers/socket-on';
import { DiTypes } from '../models/di-types';
import { createSession, Session } from '../models/session';
import { Events } from '../models/shared/events';
import { SessionConfiguration } from '../models/shared/session-configuration';
import { SessionJoin } from '../models/shared/session-join';
import { SocketWithUserData } from '../models/socket-with-user-data';
import { SocketServer } from '../servers/socket-server';
import { GameSession } from './game-session';
import { IdService } from './id.service';
import { PlayersService } from './players.service';

const debug = nodeDebug('smudgy:SessionsService');

@injectable()
export class SessionsService {
  private readonly sessions = new Map<string, GameSession>();

  constructor(
    @inject(PlayersService) private readonly playersService: PlayersService,
    @inject(IdService) private readonly idService: IdService,
    @inject(DiTypes.gameSessionFactory) private readonly gameSessionFactory: (session: Session) => GameSession,
  ) {}

  async initialize(socketServer: SocketServer): Promise<void> {
    debug('Initializing');

    socketServer.on('connection', socket => this.playerConnected(socket as SocketWithUserData));
  }

  playerConnected(socket: SocketWithUserData): void {
    debug('Socket connected %s', socket.id);

    socketOn<SessionConfiguration, string>(socket, Events.CreateSession, this.sessionCreated.bind(this));
    socketOn<SessionJoin, SessionConfiguration>(socket, Events.JoinSession, this.joinSession.bind(this));
  }

  sessionCreated(socket: SocketWithUserData, payload: SessionConfiguration, fn: ResultFn<string>): void {
    debug('Creating session for player %s', socket.userData.playerId);

    const gameSession = this.gameSessionFactory(createSession(this.idService.generate(), payload));

    this.sessions.set(gameSession.session.id, gameSession);

    fn(false, gameSession.session.id);
  }

  joinSession(socket: SocketWithUserData, payload: SessionJoin, fn: ResultFn<SessionConfiguration>): void {
    if (!payload || !payload.sessionId) {
      debug('Player %s tries to join a session, but did not submit a session ID', socket.userData.playerId);
      fn('Session ID not set');
      return;
    }

    const gameSession = this.sessions.get(payload.sessionId);

    if (!gameSession) {
      debug('Player %s tries to join session %s, but session was not found', socket.userData.playerId, payload.sessionId);
      fn('Session not found');
      return;
    }

    gameSession.playerJoin(socket);

    fn(false, gameSession.session.configuration);
  }
}
