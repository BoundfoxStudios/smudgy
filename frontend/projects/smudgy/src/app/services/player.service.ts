import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map, mapTo, switchMap } from 'rxjs/operators';
import { Events } from '../models/shared/events';
import { PlayerRegister } from '../models/shared/player-register';
import { IdService } from './id.service';
import { SocketService } from './socket.service';
import { StorageService } from './storage.service';

const PLAYER_ID_STORAGE_KEY = 'player-id';
const PLAYER_NAME_STORAGE_KEY = 'player-name';

@Injectable({
  providedIn: 'root',
})
export class PlayerService {
  constructor(
    private readonly socketService: SocketService,
    private readonly idService: IdService,
    private readonly storageService: StorageService,
  ) {
  }

  register$(name: string): Observable<void> {
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
    );
  }
}
