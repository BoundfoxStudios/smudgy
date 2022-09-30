export enum NetworkState {
  /**
   * All sockets are disconnected.
   */
  Disconnected = 'disconnected',

  /**
   * Some sockets are disconnected or trying to reconnect.
   */
  Partial = 'partial',

  /**
   * All sockets are connected.
   */
  Connected = 'connected',
}
