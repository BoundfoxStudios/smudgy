import { Socket } from 'socket.io';

export interface SocketWithUserData extends Socket {
  userData: {
    playerId: string;
  };
}
