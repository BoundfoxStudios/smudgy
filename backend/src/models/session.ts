import { SessionConfiguration, SessionLanguage } from './shared/session-configuration';

export interface Round {
  drawerPlayerId: string;
  wordToDraw: string;
  correctGuesserPlayerIds: string[];
}

export interface SessionPlayer {
  playerId: string;
  points: number;
}

export interface SessionPlayers {
  [key: string]: SessionPlayer;
}

export interface Session {
  id: string;
  configuration: SessionConfiguration;
  playerIds: SessionPlayers;
  rounds: Round[];
}

export function createSession(id: string, configuration: SessionConfiguration): Session {
  return {
    id,
    playerIds: {},
    configuration,
    rounds: [],
  };
}
