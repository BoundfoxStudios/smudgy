import { createFeatureSelector, createSelector, MemoizedSelector } from '@ngrx/store';
import { ConnectionState } from './connection.state';
import { NetworkState } from '../models/network-state';

export const connectionFeatureKey = 'connectionState';

export const selectConnectionFeature = createFeatureSelector<ConnectionState>(connectionFeatureKey);

export const selectConnectionState = createSelector(selectConnectionFeature, ({ sockets }) => {
  const networkStates = Object.values(sockets);

  if (networkStates.every(networkState => networkState === NetworkState.Connected)) {
    return NetworkState.Connected;
  }

  if (networkStates.every(networkState => networkState === NetworkState.Disconnected)) {
    return NetworkState.Disconnected;
  }

  return NetworkState.Partial;
});
