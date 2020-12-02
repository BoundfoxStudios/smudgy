import { Injectable } from '@angular/core';
import { merge, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Events } from '../models/network/events';
import { Player } from '../models/network/player';
import { SessionConfiguration } from '../models/network/session-configuration';
import { SocketService } from './socket.service';

@Injectable()
export class SessionService {
  constructor(private readonly socketService: SocketService) {}

  createSession$(sessionConfiguration: SessionConfiguration): Observable<string> {
    return this.socketService.sendAndReceive$(Events.CreateSession, sessionConfiguration);
  }

  joinSession$(sessionId: string): Observable<SessionConfiguration> {
    return this.socketService.sendAndReceive$(Events.JoinSession, { sessionId });
  }

  updateSessionConfiguration$(sessionConfiguration: SessionConfiguration): Observable<void> {
    return this.socketService.sendAndReceive$(Events.UpdateSessionConfiguration, sessionConfiguration);
  }

  sessionConfiguration$(): Observable<SessionConfiguration> {
    return this.socketService.fromEvent$(Events.UpdateSessionConfiguration);
  }

  playerEnter$(): Observable<Player> {
    return this.socketService.fromEvent$(Events.PlayerJoinSession);
  }

  playerLeave$(): Observable<string> {
    return this.socketService.fromEvent$(Events.PlayerLeaveSession);
  }

  startGame$(): Observable<void> {
    return this.socketService.send$(Events.StartGame);
  }

  gameStarted$(): Observable<void> {
    return this.socketService.fromEvent$(Events.StartGame);
  }

  players$(): Observable<Player[]> {
    return this.socketService.sendAndReceive$<Player[]>(Events.PlayerList).pipe(
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
