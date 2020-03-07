import { Socket } from 'socket.io';
import { SocketWithUserData } from '../models/socket-with-user-data';

export type ResultFn<TResult = void> = (error?: string | boolean, result?: TResult) => void;
export type SocketListener<TPayload, TResult = void> = (socket: SocketWithUserData, payload: TPayload, fn: ResultFn<TResult>) => void;

export const socketOn = <TPayload, TResult = void>(
  socket: Socket,
  event: string,
  socketListener: SocketListener<TPayload, TResult>,
): void => {
  socket.on(event, (payload: TPayload, fn: ResultFn<TResult>) => socketListener(socket as SocketWithUserData, payload, fn));
};
