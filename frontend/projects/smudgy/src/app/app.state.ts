import { connectionFeatureKey } from './modules/connection/store/connection.selectors';
import { ConnectionState } from './modules/connection/store/connection.state';
import { playerFeatureKey } from './modules/player/state/player.selectors';
import { PlayerState } from './modules/player/state/player.state';

export interface AppState {
  [connectionFeatureKey]: ConnectionState;
  [playerFeatureKey]: PlayerState;
  // [sessionFeatureKey]: SessionState;
}
