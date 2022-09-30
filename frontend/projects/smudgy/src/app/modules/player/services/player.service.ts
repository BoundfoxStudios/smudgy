import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { StorageService } from '../../../services/storage.service';
import { Player } from '../state/player.state';
import { IdService } from './id.service';
import { PlayerSocketService } from './player-socket.service';

const PLAYER_STORAGE_KEY = 'player';

@Injectable()
export class PlayerService {
  constructor(
    private readonly storageService: StorageService,
    private readonly playerSocketService: PlayerSocketService,
    private readonly idService: IdService,
  ) {}

  register(name: string, possibleId?: string): Observable<{ id: string; name: string; success: boolean }> {
    const id = possibleId ?? this.idService.generate();

    return this.login({ id, name }).pipe(
      switchMap(success => this.storageService.set$<Player>(PLAYER_STORAGE_KEY, { id, name }).pipe(mapTo({ id, name, success }))),
    );
  }

  login({ id, name }: Player): Observable<boolean> {
    return this.playerSocketService.invoke('login', { id, name });
  }

  load(): Observable<Player | undefined> {
    return this.storageService.get$<Player>(PLAYER_STORAGE_KEY);
  }
}
