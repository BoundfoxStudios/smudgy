import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { SocketsService } from '../services/sockets.service';
import { connectionActions } from './connection.actions';

@Injectable()
export class ConnectionEffects implements OnInitEffects {
  readonly init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(connectionActions.init),
        mergeMap(() => this.socketsService.initialize()),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly socketsService: SocketsService) {}

  ngrxOnInitEffects(): Action {
    return connectionActions.init();
  }
}
