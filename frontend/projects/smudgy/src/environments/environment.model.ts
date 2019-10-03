export interface GameConfiguration {
  backendUrl: string;
  canvasThrottleTime: number;
}

export interface Environment {
  production: boolean;
  gameConfiguration: GameConfiguration;
}
