import { createReducer, on } from '@ngrx/store';
import { playerLoadSuccess, playerLoginSuccess, playerRegisterSuccess } from './player.actions';
import { initialState } from './player.state';

export const playerReducer = createReducer(
  initialState,
  on(playerLoadSuccess, (state, { player }) => ({ ...state, player })),
  on(playerLoginSuccess, state => ({ ...state, isLoggedIn: true })),
  on(playerRegisterSuccess, (state, { player }) => ({ ...state, player, isLoggedIn: true })),
);
