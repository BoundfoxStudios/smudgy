import { IDebugger } from 'debug';
import * as nodeDebug from 'debug';
import { interfaces } from 'inversify';
import { ResultFn, socketOn } from '../helpers/socket-on';
import { Session } from '../models/session';
import { Events } from '../models/shared/events';
import { SessionConfiguration } from '../models/shared/session-configuration';
import { SocketWithUserData } from '../models/socket-with-user-data';
import { PlayersService } from './players.service';

let debug: IDebugger;

export const gameSessionFactory = (context: interfaces.Context): ((session: Session) => GameSession) => {
  return (session: Session): GameSession => {
    const playersService = context.container.get(PlayersService);

    return new GameSession(session, playersService);
  };
};

export class GameSession {
  private readonly sessionRoomKey: string;

  constructor(public readonly session: Session, private readonly playersService: PlayersService) {
    this.sessionRoomKey = `session_${this.session.id}`;
    debug = nodeDebug(`smudgy:GameSession:${this.session.id}`);
  }

  playerJoin(socket: SocketWithUserData): void {
    socket.join(this.sessionRoomKey);

    const { playerId } = socket.userData;

    if (!this.session.playerIds[playerId]) {
      debug('Player %s joined the session %s', playerId, this.session.id);

      this.session.playerIds[playerId] = {
        playerId,
        points: 0,
      };
    } else {
      debug('Player %s was already in session %s before.', playerId, this.session.id);
    }

    socket.once('disconnect', () => this.playerDisconnect(socket));

    socketOn(socket, Events.UpdateSessionConfiguration, this.updateSessionConfiguration.bind(this));
  }

  private playerDisconnect(socket: SocketWithUserData): void {
    socket.leave(this.sessionRoomKey);
    socket.in(this.sessionRoomKey).emit(Events.PlayerLeaveSession, { playerId: socket.userData.playerId });
  }

  private updateSessionConfiguration(socket: SocketWithUserData, payload: SessionConfiguration, fn: ResultFn): void {
    debug('Receiving new session configuration from %s: %o', socket.userData.playerId, payload);

    if (this.session.hostPlayerId !== socket.userData.playerId) {
      debug('Can not set the session configuration. It was not send by the host.');
      fn('Player is not host');
      return;
    }

    this.session.configuration = payload;
    socket.in(this.sessionRoomKey).emit(Events.UpdateSessionConfiguration, payload);

    // TODO: validate new session configuration
    fn();
  }
}
