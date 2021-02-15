import * as nodeDebug from 'debug';
import { injectable } from 'inversify';
import { Socket } from 'socket.io';
import { ResultFn, socketOn } from '../helpers/socket-on';
import { BackendPlayer } from '../models/backend-player';
import { Events } from '../models/shared/events';
import { Player } from '../models/shared/player';
import { PlayerRegister } from '../models/shared/player-register';
import { SocketWithUserData } from '../models/socket-with-user-data';
import { SocketServer } from '../servers/socket-server';

const debug = nodeDebug('smudgy:PlayersService');

@injectable()
export class PlayersService {
  private readonly players = new Map<string, BackendPlayer>();

  initialize(socketServer: SocketServer): void {
    debug('Initializing');

    socketServer.on('connection', socket => this.playerConnected(socket));
  }

  getPlayer(id: string): Player | undefined {
    return this.players.get(id);
  }

  playerConnected(socket: Socket): void {
    debug('Socket connected %s', socket.id);

    socket.on('disconnect', () => this.playerDisconnected(socket as SocketWithUserData));

    socketOn(socket, Events.Register, this.playerRegistered.bind(this));
  }

  playerRegistered(socket: SocketWithUserData, payload: PlayerRegister, fn: ResultFn): void {
    if (!payload || !payload.id || !payload.name) {
      debug('Missing player registration information %s %o', socket.id, payload);
      fn('Missing information for registration');
      return;
    }

    const existingPlayer = this.players.get(payload.id);

    if (existingPlayer) {
      debug('Player %s is already registered with this server');
      fn();
      return;
    }

    const player: BackendPlayer = {
      socketId: socket.id,
      id: payload.id,
      name: payload.name,
    };

    socket.userData = socket.userData || {};
    socket.userData.playerId = player.id;

    this.players.set(player.id, player);
    debug('Registered new player %o', player);

    fn();
  }

  playerDisconnected(socket: SocketWithUserData): void {
    debug('Socket disconnected %s', socket.id);

    if (!socket.userData || !socket.userData.playerId) {
      // TODO: Logging
      return;
    }

    this.players.delete(socket.userData.playerId);
  }
}
