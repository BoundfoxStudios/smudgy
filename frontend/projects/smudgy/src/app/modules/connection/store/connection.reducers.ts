import { createReducer, on } from '@ngrx/store';
import { changeConnectionState } from './connection.actions';
import { initialState } from './connection.state';

export const connectionReducer = createReducer(
  initialState,
  on(changeConnectionState, (state, payload) => ({
    ...state,
    state: payload.state,
  })),
);
