import * as nodeDebug from 'debug';
import { interfaces } from 'inversify';
import { Session } from '../models/session';
import { Events } from '../models/shared/events';
import { SocketWithUserData } from '../models/socket-with-user-data';
import { PlayersService } from './players.service';

const debug = nodeDebug('smudgy:GameSession');

export function gameSessionFactory(context: interfaces.Context): (session: Session) => GameSession {
  return (session: Session) => {
    const playersService = context.container.get(PlayersService);

    return new GameSession(session, playersService);
  };
}

export class GameSession {
  private readonly sessionRoomKey: string;

  constructor(public readonly session: Session, private readonly playersService: PlayersService) {
    this.sessionRoomKey = `session_${this.session.id}`;
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
  }

  private playerDisconnect(socket: SocketWithUserData): void {
    socket.leave(this.sessionRoomKey);
    socket.in(this.sessionRoomKey).emit(Events.PlayerLeaveSession, { playerId: socket.userData.playerId });
  }
}
