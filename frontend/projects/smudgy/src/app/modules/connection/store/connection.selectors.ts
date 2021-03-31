import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ConnectionState } from './connection.state';

export const connectionFeatureKey = 'connectionState';

export const selectConnectionFeature = createFeatureSelector<ConnectionState>(connectionFeatureKey);
export const selectConnectionState = createSelector(selectConnectionFeature, state => state.state);
