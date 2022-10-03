import { NetworkState } from '../models/network-state';

export interface ConnectionState {
  state: NetworkState;
}

export const initialState: ConnectionState = {
  state: NetworkState.Disconnected,
};
