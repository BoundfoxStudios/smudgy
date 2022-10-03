import { SessionLanguage } from '../models';

export interface SessionConfiguration {
  language: SessionLanguage;
  roundTimeInSeconds: number;
  roundsToPlay: number;
  maxPlayers: number;
}
