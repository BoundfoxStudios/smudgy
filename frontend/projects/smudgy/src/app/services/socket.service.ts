import { Injectable } from '@angular/core';
import { IDebugger } from 'debug';
import { BehaviorSubject, defer, Observable } from 'rxjs';
import { share, timeout } from 'rxjs/operators';
import * as io from 'socket.io-client';
import { environment } from '../../environments/environment';
import Socket = SocketIOClient.Socket;
import { DebugService } from './debug.service';

export enum SocketState {
  Disconnected = 'disconnected',
  Connecting = 'connecting',
  Connected = 'connected'
}

let globalRequestId = 0;

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private stateSubject = new BehaviorSubject<SocketState>(SocketState.Disconnected);
  state$ = this.stateSubject.asObservable();

  private socket: Socket;
  private isInitialized: boolean;
  private readonly debug: IDebugger;

  constructor(debugService: DebugService) {
    this.debug = debugService.derive('SocketService');
    this.socket = io(environment.gameConfiguration.backendUrl);
  }

  connect(): void {
    if (this.socket.connected) {
      return;
    }

    this.stateSubject.next(SocketState.Connecting);

    if (!this.isInitialized) {
      this.socket.on('connect', () => this.stateSubject.next(SocketState.Connected));
      this.socket.on('reconnect', () => this.stateSubject.next(SocketState.Connected));
      this.socket.on('connect_error', () => this.stateSubject.next(SocketState.Disconnected));
      this.socket.on('connect_timeout', () => this.stateSubject.next(SocketState.Disconnected));
      this.socket.on('disconnect', () => this.stateSubject.next(SocketState.Disconnected));
      this.socket.on('reconnecting', () => this.stateSubject.next(SocketState.Connecting));
      this.socket.on('reconnect_error', () => this.stateSubject.next(SocketState.Connecting));
      this.socket.on('reconnect_failed', () => this.stateSubject.next(SocketState.Disconnected));
      this.isInitialized = true;
    }

    this.socket.connect();
  }

  fromEvent$<T>(name: string): Observable<T> {
    return new Observable<T>(observer => {
      this.socket.on(name, (data: T) => observer.next(data));

      return () => this.socket.removeListener(name);
    }).pipe(share());
  }

  send$(event: string, payload: object): Observable<void> {
    return defer(() => {
      this.debug('[Request # %d] Sending event %s with payload %o', ++globalRequestId, event, payload);

      this.socket.emit(event, payload);
    });
  }

  sendAndReceive$<T>(event: string, payload?: object): Observable<T> {
    return new Observable<T>(observer => {
      const requestId = ++globalRequestId;
      this.debug('[Request # %d] Sending event %s with payload %o', requestId, event, payload);

      this.socket.emit(event, payload, (error, result) => {
        if (error) {
          this.debug('[Request # %d] Error %s', requestId, error);
          observer.error(error);
          return;
        }

        this.debug('[Request # %d] Result %o', requestId, result);

        observer.next(result);
        observer.complete();
      });
    }).pipe(timeout(environment.gameConfiguration.connectionTimeout));
  }

  disconnect() {
    this.socket.disconnect();
  }
}
