import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Player } from '../models/network/player';
import { SessionConfiguration } from '../models/network/session-configuration';
import { HubService } from './hubs/hub.service';

@Injectable()
export class SessionService {
  constructor(private readonly hubService: HubService) {}

  createSession$(sessionConfiguration: SessionConfiguration): Observable<string> {
    return this.hubService.invoke('CreateSession', sessionConfiguration);
  }

  joinSession$(sessionId: string): Observable<SessionConfiguration> {
    return this.hubService.invoke('JoinSession', sessionId);
  }

  updateSessionConfiguration$(sessionConfiguration: SessionConfiguration): Observable<void> {
    return this.hubService.invoke('UpdateSessionConfiguration', sessionConfiguration);
  }

  sessionConfiguration$(): Observable<SessionConfiguration> {
    return this.hubService.on('updateSessionConfiguration');
  }

  playerEnter$(): Observable<Player> {
    return this.hubService.on('playerJoinSession');
  }

  playerLeave$(): Observable<string> {
    return this.hubService.on('playerLeaveSession');
  }

  startGame$(): Observable<void> {
    return this.hubService.invoke('StartGame');
  }

  gameStarted$(): Observable<void> {
    return this.hubService.on('startGame');
  }

  players$(): Observable<Player[]> {
    return this.hubService.invoke<Player[]>('PlayerList').pipe(
      switchMap(playerList =>
        merge(
          of(playerList),
          this.playerEnter$().pipe(
            map(player => {
              if (!playerList.find(p => p.id === player.id)) {
                playerList.push(player);
              }

              return playerList;
            }),
          ),
          this.playerLeave$().pipe(
            map(playerId => {
              const index = playerList.findIndex(p => p.id === playerId);

              if (index !== -1) {
                playerList.splice(index, 1);
              }

              return playerList;
            }),
          ),
        ),
      ),
    );
  }
}
