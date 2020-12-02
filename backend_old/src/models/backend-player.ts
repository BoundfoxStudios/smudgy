import { Player } from './shared/player';

export interface BackendPlayer extends Player {
  socketId: string;
}
