export interface GameConfiguration {
  /**
   * URL of the socket.io backend.
   */
  backendUrl: string;

  /**
   * Throttle time between draw commands.
   */
  canvasThrottleTime: number;

  /**
   * The number of points to aggregate before sending them to the server.
   */
  networkDrawCommandBuffer: number;

  /**
   * Time in milliseconds when a connection will timeout.
   */
  connectionTimeout: number;
}

export interface Environment {
  production: boolean;
  gameConfiguration: GameConfiguration;
}
