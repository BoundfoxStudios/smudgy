import { HubConnectionState } from '@microsoft/signalr';
import { NetworkState } from '../services/hub.service';

export interface ConnectionState {
  state: NetworkState;
}

export const initialState: ConnectionState = {
  state: HubConnectionState.Disconnected,
};
