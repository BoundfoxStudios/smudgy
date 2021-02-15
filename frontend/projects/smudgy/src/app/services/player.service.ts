import { Injectable } from '@angular/core';
import { IDebugger } from 'debug';
import { combineLatest, EMPTY, Observable, of } from 'rxjs';
import { map, mapTo, switchMap, tap } from 'rxjs/operators';
import { DebugService } from './debug.service';
import { HubService } from '../connection/services/hub.service';
import { IdService } from './id.service';
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
    private readonly hubService: HubService,
    private readonly idService: IdService,
    private readonly storageService: StorageService,
    debugService: DebugService,
  ) {
    this.debug = debugService.derive('PlayerService');
  }

  get isRegistered(): boolean {
    return this.playerIsRegistered;
  }

  get playerName$(): Observable<string | null> {
    return this.storageService.get$(PLAYER_NAME_STORAGE_KEY);
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

    return combineLatest([this.storageService.get$(PLAYER_ID_STORAGE_KEY), this.storageService.get$(PLAYER_NAME_STORAGE_KEY)]).pipe(
      switchMap(([id, name]: [string, string]) => {
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

    return this.storageService.get$<string>(PLAYER_ID_STORAGE_KEY).pipe(
      switchMap(playerId => {
        if (!playerId) {
          playerId = this.idService.generate();
          return this.storageService.set$(PLAYER_ID_STORAGE_KEY, playerId).pipe(mapTo(playerId));
        }

        return of(playerId);
      }),
      switchMap(id => this.hubService.invoke('Register', id, name)),
      tap(registrationSuccessful => {
        if (!registrationSuccessful) {
          throw new Error('Registration was not successful');
        }
      }),
      switchMap(() => this.storageService.set$(PLAYER_NAME_STORAGE_KEY, name)),
      map(() => {
        this.debug('Player successfully registered');
        this.playerIsRegistered = true;
      }),
    );
  }
}
