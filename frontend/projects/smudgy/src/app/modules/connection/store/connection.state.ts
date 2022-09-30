import { NetworkState } from '../models/network-state';

export interface ConnectionState {
  sockets: { [key: string]: NetworkState };
}

export const initialState: ConnectionState = {
  sockets: {},
};
