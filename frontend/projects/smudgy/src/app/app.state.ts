import { connectionFeatureKey } from './connection/store/connection.selectors';
import { ConnectionState } from './connection/store/connection.state';
import { playerFeatureKey } from './player/state/player.selectors';
import { PlayerState } from './player/state/player.state';

export interface AppState {
  [connectionFeatureKey]: ConnectionState;
  [playerFeatureKey]: PlayerState;
}
