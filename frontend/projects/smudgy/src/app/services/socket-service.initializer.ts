import { SocketService } from './socket.service';

export function socketServiceInitializerFactory(socketService: SocketService): () => Promise<boolean> {
  return async () => {
    socketService.connect();
    return true;
  };
}

export const socketServiceInitializerFactoryDeps = [SocketService];
