import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType, OnInitEffects } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { mergeMap } from 'rxjs/operators';
import { HubService } from '../services/hub.service';
import { initConnection } from './connection.actions';

@Injectable()
export class ConnectionEffects implements OnInitEffects {
  readonly init$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(initConnection),
        mergeMap(() => this.hubService.initialize()),
      ),
    { dispatch: false },
  );

  constructor(private readonly actions$: Actions, private readonly hubService: HubService) {}

  ngrxOnInitEffects(): Action {
    return initConnection();
  }
}
