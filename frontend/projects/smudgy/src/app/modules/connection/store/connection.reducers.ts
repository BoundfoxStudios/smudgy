import { createReducer, on } from '@ngrx/store';
import { initialState } from './connection.state';
import { connectionActions } from './connection.actions';

export const connectionReducer = createReducer(
  initialState,
  on(connectionActions.changeState, (state, payload) => ({
    ...state,
    state: payload.state,
  })),
);
