export enum SessionLanguage {
  German = 'German',
  English = 'English',
}

export interface SessionConfiguration {
  language: SessionLanguage;
  roundTimeInSeconds: number;
  roundsToPlay: number;
  maxPlayers: number;
}
