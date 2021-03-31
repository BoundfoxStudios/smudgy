import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { mapTo, switchMap } from 'rxjs/operators';
import { HubService } from '../../connection/services/hub.service';
import { IdService } from './id.service';
import { StorageService } from '../../../services/storage.service';
import { Player } from '../state/player.state';

const PLAYER_STORAGE_KEY = 'player';

@Injectable()
export class PlayerService {
  constructor(
    private readonly storageService: StorageService,
    private readonly hubService: HubService,
    private readonly idService: IdService,
  ) {}

  register(name: string, possibleId?: string): Observable<{ id: string; name: string; success: boolean }> {
    const id = possibleId ?? this.idService.generate();

    return this.login({ id, name }).pipe(
      switchMap(success =>
        this.storageService
          .set$<Player>(PLAYER_STORAGE_KEY, { id, name })
          .pipe(mapTo({ id, name, success })),
      ),
    );
  }

  login({ id, name }: Player): Observable<boolean> {
    return this.hubService.invoke('register', id, name); // due to shitty API register === login :)
  }

  load(): Observable<Player | undefined> {
    return this.storageService.get$<Player>(PLAYER_STORAGE_KEY);
  }
}
