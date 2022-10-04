import { createReducer, on } from '@ngrx/store';
import { playerActions } from './player.actions';
import { initialState } from './player.state';

export const playerReducer = createReducer(
  initialState,
  on(playerActions.loadSuccess, (state, { player }) => ({ ...state, player })),
  on(playerActions.loginSuccess, state => ({ ...state, isLoggedIn: true })),
  on(playerActions.registerSuccess, (state, { player }) => ({ ...state, player, isLoggedIn: true })),
);
