import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CONFIGURATION, PlayerModuleConfiguration } from '../player-module.configuration';
import { PlayerService } from '../services/player.service';
import { selectPlayerId } from './player.selectors';
import { playerActions } from './player.actions';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  readonly loadPlayerFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.load),
      switchMap(() => this.playerService.load()),
      map(player => (player ? playerActions.loadSuccess({ player }) : playerActions.loadFail())),
    ),
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.login, playerActions.loadSuccess),
      switchMap(({ player }) => this.playerService.login(player)),
      map(loginSuccessful => (loginSuccessful ? playerActions.loginSuccess() : playerActions.loginFail())),
    ),
  );

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerActions.register),
      withLatestFrom(this.store.select(selectPlayerId)),
      switchMap(([{ name }, possibleId]) => this.playerService.register(name, possibleId)),
      map(({ id, name, success }) => (success ? playerActions.registerSuccess({ player: { id, name } }) : playerActions.registerFail())),
    ),
  );

  readonly redirectToGameStartUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(playerActions.registerSuccess),
        switchMap(() => this.router.navigate([`${this.configuration.startGameUrl}`], { queryParamsHandling: 'preserve' })),
      ),
    { dispatch: false },
  );

  constructor(
    private readonly actions$: Actions,
    private readonly store: Store,
    private readonly playerService: PlayerService,
    private readonly router: Router,
    @Inject(CONFIGURATION) private readonly configuration: PlayerModuleConfiguration,
  ) {}

  ngrxOnInitEffects(): Action {
    return playerActions.load();
  }
}
