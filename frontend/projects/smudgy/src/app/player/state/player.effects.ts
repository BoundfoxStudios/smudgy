import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { CONFIGURATION, PlayerModuleConfiguration } from '../player-module.configuration';
import { PlayerService } from '../services/player.service';
import {
  playerLoad,
  playerLoadFail,
  playerLoadSuccess,
  playerLogin,
  playerLoginFail,
  playerLoginSuccess,
  playerRegister,
  playerRegisterFail,
  playerRegisterSuccess,
} from './player.actions';
import { selectPlayerId } from './player.selectors';

@Injectable()
export class PlayerEffects implements OnInitEffects {
  readonly loadPlayerFromStorage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerLoad),
      switchMap(() => this.playerService.load()),
      map(player => (player ? playerLoadSuccess({ player }) : playerLoadFail())),
    ),
  );

  readonly login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerLogin),
      switchMap(({ player }) => this.playerService.login(player)),
      map(loginSuccessful => (loginSuccessful ? playerLoginSuccess() : playerLoginFail())),
    ),
  );

  readonly register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(playerRegister),
      withLatestFrom(this.store.select(selectPlayerId)),
      switchMap(([{ name }, possibleId]) => this.playerService.register(name, possibleId)),
      map(({ id, name, success }) => (success ? playerRegisterSuccess({ player: { id, name } }) : playerRegisterFail())),
    ),
  );

  readonly redirectToGameStartUrl$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(playerRegisterSuccess),
        switchMap(() => this.router.navigate([`${this.configuration.startGameUrl}`])),
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
    return playerLoad();
  }
}
