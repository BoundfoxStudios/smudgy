import { PlayerListItem } from './player-list-item';
import { SessionConfiguration } from './session-configuration';

export interface ServerToClientEvents {
  'player-join-session': (player: PlayerListItem) => void;
  'update-session-configuration': (sessionConfiguration: SessionConfiguration) => void;
}

export type ClientToServerEvents = 'create-session' | 'join-session' | 'player-list' | 'update-session-configuration';
