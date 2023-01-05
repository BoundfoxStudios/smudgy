import { PlayerListItem } from './player-list-item';
import { SessionConfiguration } from './session-configuration';

export interface ServerToClientEvents {
  'player-join-session': (player: PlayerListItem) => void;
  'player-leave-session': (player: PlayerListItem) => void;
  'update-session-configuration': (sessionConfiguration: SessionConfiguration) => void;
  'start-game': () => void;
}

export type ClientToServerEvents = 'create-session' | 'join-session' | 'player-list' | 'update-session-configuration' | 'start-game';
