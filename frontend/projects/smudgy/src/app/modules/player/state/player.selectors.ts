import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PlayerState } from './player.state';

export const playerFeatureKey = 'playerState';

export const selectPlayerFeature = createFeatureSelector<PlayerState>(playerFeatureKey);
export const selectPlayer = createSelector(selectPlayerFeature, state => state.player);
export const selectPlayerName = createSelector(selectPlayer, state => state?.name);
export const selectPlayerId = createSelector(selectPlayer, state => state?.id);
export const selectLoggedIn = createSelector(selectPlayerFeature, state => state.isLoggedIn);
