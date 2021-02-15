import { connectionFeatureKey } from './connection/store/connection.selectors';
import { ConnectionState } from './connection/store/connection.state';

export interface AppState {
  [connectionFeatureKey]: ConnectionState;
}
