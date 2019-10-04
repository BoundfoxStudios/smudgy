export enum SessionLanguage {
  German = 'german',
  English = 'english',
}

export interface SessionConfiguration {
  language: SessionLanguage;
  roundTimeInSeconds: number;
  roundsToPlay: number;
}
