import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ComponentStore } from '@ngrx/component-store';
import { Observable, of, zip } from 'rxjs';
import { switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { HubService } from '../../../connection/services/hub.service';
import { SessionConfiguration, SessionLanguage } from '../../session.model';

export interface Player {
  id: string;
  name: string;
}

export interface SessionState {
  id: string;
  configuration: SessionConfiguration;
  inviteUrl: string;
  players: Player[];
  isHost: boolean;
  isStarting: boolean;
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
      tap((sessionId: string) => this.joinSession({ sessionId, isHost: true })),
    ),
  );

  readonly joinSession = this.effect((configuration$: Observable<{ sessionId: string; isHost: boolean }>) =>
    configuration$.pipe(
      switchMap(configuration =>
        zip(of(configuration), this.hubService.invoke<SessionConfiguration>('JoinSession', configuration.sessionId)),
      ),
      tap(([{ sessionId, isHost }, sessionConfiguration]) => {
        this.setState({
          id: sessionId,
          inviteUrl: this.createInviteUrl(sessionId),
          configuration: { ...defaultConfiguration },
          players: [],
          isHost,
          isStarting: false,
        });

        this.updateSessionConfiguration(sessionConfiguration);
        this.requestPlayerList(sessionId);
        this.receiveConfigurationUpdates();
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

  readonly startGame = this.effect((startGame$: Observable<void>) =>
    startGame$.pipe(
      withLatestFrom(this.select(state => state.id)),
      tap(() => this.patchState({ isStarting: true })),
      switchMap(([, id]) => this.hubService.invoke('StartGame', id)),
      tap(() => void this.router.navigate(['play'], { relativeTo: this.activatedRoute })),
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
      tap((player: Player) => this.patchState(state => ({ ...state, players: [...state.players, player] }))),
    ),
  );

  private readonly receivePlayerLeaveSession = this.effect((stream$: Observable<void>) =>
    stream$.pipe(
      switchMap(() => this.hubService.on<Player>('playerLeaveSession')),
      tap((player: Player) => this.patchState(state => ({ ...state, players: state.players.filter(p => p.id !== player.id) }))),
    ),
  );

  private readonly receiveConfigurationUpdates = this.effect((stream$: Observable<void>) =>
    stream$.pipe(
      switchMap(() => this.hubService.on<SessionConfiguration>('updateSessionConfiguration')),
      tap((sessionConfiguration: SessionConfiguration) => this.updateSessionConfiguration(sessionConfiguration)),
    ),
  );

  readonly configuration$ = this.select(state => state.configuration);
  readonly inviteUrl$ = this.select(state => state.inviteUrl);
  readonly players$ = this.select(state => state.players);
  readonly isHost$ = this.select(state => state.isHost);
  readonly isStarting$ = this.select(state => state.isStarting);

  private readonly updateSessionConfiguration = this.updater((state, sessionConfiguration: SessionConfiguration) => ({
    ...state,
    configuration: { ...sessionConfiguration },
  }));

  constructor(private readonly hubService: HubService, private readonly router: Router, private readonly activatedRoute: ActivatedRoute) {
    super();
  }

  private createInviteUrl(sessionId: string): string {
    return `${window.location.origin}/game/lobby?sessionId=${sessionId}`;
  }
}
