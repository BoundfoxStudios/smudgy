import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of, zip } from 'rxjs';
import { filter, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HubService } from '../../../connection/services/hub.service';
import { isDefined } from '../../../utils/is-defined';
import { SessionConfiguration, SessionLanguage } from '../../session.model';

export interface Player {
  id: string;
  name: string;
}

export interface SessionState {
  id?: string;
  configuration?: SessionConfiguration;
  inviteUrl?: string;
  players?: Player[];
  isHost?: boolean;
}

const defaultConfiguration: SessionConfiguration = {
  language: SessionLanguage.German, // TODO: Set to current user language
  maxPlayers: 6,
  roundsToPlay: 5,
  roundTimeInSeconds: 60,
};

@Injectable()
export class SessionStore extends ComponentStore<SessionState> {
  readonly createSession = this.effect((stream$: Observable<void>) =>
    stream$.pipe(
      switchMap(() => this.hubService.invoke<string>('CreateSession', defaultConfiguration)),
      tap((sessionId: string) =>
        this.setState(() => ({
          id: sessionId,
          inviteUrl: this.createInviteUrl(sessionId),
          configuration: { ...defaultConfiguration },
          isHost: true,
        })),
      ),
      tap((sessionId: string) => this.joinSession(sessionId)),
    ),
  );

  readonly joinSession = this.effect((sessionId$: Observable<string>) =>
    sessionId$.pipe(
      switchMap(sessionId => zip(of(sessionId), this.hubService.invoke<SessionConfiguration>('JoinSession', sessionId))),
      tap(([sessionId, sessionConfiguration]) => {
        this.updateSessionConfiguration(sessionConfiguration);
        this.receiveConfigurationUpdates();
        this.requestPlayerList(sessionId);
        this.receivePlayerJoinSession();
        this.receivePlayerLeaveSession();
      }),
    ),
  );

  readonly changeSessionConfiguration = this.effect((configuration$: Observable<SessionConfiguration>) =>
    configuration$.pipe(
      withLatestFrom(this.select(state => state.id)),
      switchMap(([configuration, id]) =>
        this.hubService
          .invoke('UpdateSessionConfiguration', id, configuration)
          .pipe(tap(() => this.updateSessionConfiguration(configuration))),
      ),
    ),
  );

  private readonly requestPlayerList = this.effect((stream$: Observable<string>) =>
    stream$.pipe(
      switchMap(sessionId => this.hubService.invoke<Player[]>('PlayerList', sessionId)),
      tap((players: Player[]) => this.patchState({ players })),
    ),
  );

  private readonly receivePlayerJoinSession = this.effect((stream$: Observable<void>) =>
    stream$.pipe(
      switchMap(() => this.hubService.on<Player>('playerJoinSession')),
      tap((player: Player) => this.patchState(state => ({ ...state, players: [...state.players!, player] }))),
    ),
  );

  private readonly receivePlayerLeaveSession = this.effect((stream$: Observable<void>) =>
    stream$.pipe(
      switchMap(() => this.hubService.on<Player>('playerLeaveSession')),
      tap((player: Player) => this.patchState(state => ({ ...state, players: state.players!.filter(p => p.id !== player.id) }))),
    ),
  );

  private readonly receiveConfigurationUpdates = this.effect((stream$: Observable<void>) =>
    stream$.pipe(
      switchMap(() => this.hubService.on<SessionConfiguration>('updateSessionConfiguration')),
      tap((sessionConfiguration: SessionConfiguration) => this.updateSessionConfiguration(sessionConfiguration)),
    ),
  );

  readonly configuration$ = this.select(state => state.configuration).pipe(filter(isDefined));
  readonly inviteUrl$ = this.select(state => state.inviteUrl).pipe(filter(isDefined));
  readonly players$ = this.select(state => state.players).pipe(filter(isDefined));
  readonly isHost$ = this.select(state => state.isHost);

  private readonly updateSessionConfiguration = this.updater((state, sessionConfiguration: SessionConfiguration) => ({
    ...state,
    configuration: { ...sessionConfiguration },
  }));

  constructor(private readonly hubService: HubService) {
    super({});
  }

  private createInviteUrl(sessionId: string): string {
    return `${window.location.origin}/game/lobby?sessionId=${sessionId}`;
  }
}
