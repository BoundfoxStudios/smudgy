import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { IDebugger } from 'debug';
import { BehaviorSubject, defer, EMPTY, Observable, of, tap } from 'rxjs';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { io, Socket } from 'socket.io-client';
import { DebugService } from '../../debug/debug.service';
import { CONFIGURATION, ConnectionModuleConfiguration } from '../connection-module.configuration';
import { NetworkState } from '../models/network-state';
import { connectionActions } from '../store/connection.actions';
import { ConnectionState } from '../store/connection.state';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  private readonly socketConnection = new BehaviorSubject<Socket | undefined>(undefined);
  private readonly socketConnection$ = this.socketConnection.asObservable().pipe(filter((socket): socket is Socket => !!socket));

  private readonly debug: IDebugger;

  protected constructor(
    @Inject(CONFIGURATION) private readonly configuration: ConnectionModuleConfiguration,
    private readonly store: Store<ConnectionState>,
    debugService: DebugService,
  ) {
    this.debug = debugService.derive('SocketService');
  }

  initialize(): Observable<void> {
    if (this.socketConnection.getValue()) {
      return EMPTY;
    }

    const socket = io([this.configuration.url, 'game'].join('/'), {
      autoConnect: false,
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      this.debug('Connection established');
      this.propagateStateChange(NetworkState.Connected);
    });

    socket.on('disconnect', () => {
      this.debug('Connection closed');
      this.propagateStateChange(NetworkState.Disconnected);
    });

    this.propagateStateChange(NetworkState.Disconnected);
    return defer(() => of(socket.connect())).pipe(
      tap(() => this.socketConnection.next(socket)),
      map(() => undefined),
    );
  }

  invoke<T>(event: string, payload: unknown): Observable<T> {
    return this.deferredSocketConnection().pipe(
      switchMap(
        socket =>
          new Observable<T>(observer => {
            socket.emit(event, payload, (response: T) => {
              observer.next(response);
              observer.complete();
            });
          }),
      ),
    );
  }

  on<T>(event: string): Observable<T> {
    return this.deferredSocketConnection().pipe(
      switchMap(
        socket =>
          new Observable<T>(observer => {
            const callback = (response: T): void => observer.next(response);

            socket.on(event, callback);

            return () => socket.off(event, callback);
          }),
      ),
    );
  }

  protected deferredSocketConnection(): Observable<Socket> {
    return defer(() => this.socketConnection$).pipe(take(1));
  }

  protected propagateStateChange(state: NetworkState): void {
    this.store.dispatch(connectionActions.changeState({ state }));
  }
}
