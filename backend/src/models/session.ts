import { SessionConfiguration } from './shared/session-configuration';

export enum SessionState {
  Lobby,
  Playing
}

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
  hostPlayerId: string;
  configuration: SessionConfiguration;
  playerIds: SessionPlayers;
  rounds: Round[];
  state: SessionState,
}

export const createSession = (id: string, hostPlayerId: string, configuration: SessionConfiguration): Session => {
  return {
    id,
    hostPlayerId,
    playerIds: {},
    configuration,
    rounds: [],
    state: SessionState.Lobby,
  };
};
