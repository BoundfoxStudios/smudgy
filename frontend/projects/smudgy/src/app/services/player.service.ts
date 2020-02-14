import { Injectable } from '@angular/core';
import { IDebugger } from 'debug';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { Events } from '../models/shared/events';
import { PlayerRegister } from '../models/shared/player-register';
import { DebugService } from './debug.service';
import { IdService } from './id.service';
import { SocketService } from './socket.service';
import { StorageService } from './storage.service';

const PLAYER_ID_STORAGE_KEY = 'player-id';
const PLAYER_NAME_STORAGE_KEY = 'player-name';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  private readonly debug: IDebugger;
  private playerIsRegistered: boolean;

  constructor(
    private readonly socketService: SocketService,
    private readonly idService: IdService,
    private readonly storageService: StorageService,
    debugService: DebugService,
  ) {
    this.debug = debugService.derive('PlayerService');
  }

  get isRegistered(): boolean {
    return this.playerIsRegistered;
  }

  /**
   * Tries to register automatically at the server, e.g. in case of reloading the browser.
   * Returns true, if the registration was successful.
   * Returns false, if the registration was not possible (e.g. missing player name).
   * Will error, in case something else happens.
   */
  autoRegister$(): Observable<boolean> {
    this.debug('Trying to auto register');

    if (this.isRegistered) {
      this.debug('Player is already registered. Skipping autoRegister$');
      return of(true);
    }

    return combineLatest([
      this.storageService.get$(PLAYER_ID_STORAGE_KEY),
      this.storageService.get$(PLAYER_NAME_STORAGE_KEY),
    ]).pipe(
      switchMap(([ id, name ]: [ string, string ]) => {
        if (!id && !name) {
          return of(false);
        }

        return this.register$(name).pipe(mapTo(true));
      }),
    );
  }

  register$(name: string): Observable<void> {
    if (this.isRegistered) {
      this.debug('Player is already registered. Skipping register$');
      return EMPTY;
    }

    return this.storageService.get$(PLAYER_ID_STORAGE_KEY).pipe(
      switchMap(playerId => {
        if (!playerId) {
          playerId = this.idService.generate();
          return this.storageService.set$(PLAYER_ID_STORAGE_KEY, playerId).pipe(mapTo(playerId));
        }

        return of(playerId);
      }),
      map(id => ({ name, id } as PlayerRegister)),
      switchMap(payload => this.socketService.sendAndReceive$(Events.Register, payload)),
      switchMap(() => this.storageService.set$(PLAYER_NAME_STORAGE_KEY, name)),
      tap(() => {
        this.debug('Player successfully registered');
        this.playerIsRegistered = true;
      }),
    );
  }
}
