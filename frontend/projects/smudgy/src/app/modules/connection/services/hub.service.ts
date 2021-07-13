import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { Store } from '@ngrx/store';
import { IDebugger } from 'debug';
import { BehaviorSubject, defer, EMPTY, Observable } from 'rxjs';
import { filter, switchMap, take, tap } from 'rxjs/operators';
import { DebugService } from '../../debug/debug.service';
import { changeConnectionState } from '../store/connection.actions';
import { ConnectionState } from '../store/connection.state';
import { HubConnectionBuilderService } from './hub-connection-builder.service';

export type NetworkState = HubConnectionState.Disconnected | HubConnectionState.Connecting | HubConnectionState.Connected;

@Injectable({
  providedIn: 'root',
})
export class HubService {
  private readonly hubConnection = new BehaviorSubject<HubConnection | undefined>(undefined);
  private readonly hubConnection$ = this.hubConnection
    .asObservable()
    .pipe(filter((hubConnection): hubConnection is HubConnection => !!hubConnection));

  private readonly debug: IDebugger;

  protected constructor(
    private readonly hubConnectionBuilderService: HubConnectionBuilderService,
    private readonly store: Store<ConnectionState>,
    debugService: DebugService,
  ) {
    this.debug = debugService.derive('HubService');
  }

  initialize(): Observable<void> {
    if (this.hubConnection.getValue()) {
      return EMPTY;
    }

    const hubConnection = this.hubConnectionBuilderService.createConnection('game');

    hubConnection.onclose(error => {
      this.debug('Connection closed. %o', error);
      this.propagateStateChange(HubConnectionState.Disconnected);
    });

    hubConnection.onreconnecting(error => {
      if (error) {
        this.debug('Reconnecting due to error %o', error);
      } else {
        this.debug('Reconnecting...');
      }

      this.propagateStateChange(HubConnectionState.Connecting);
    });

    hubConnection.onreconnected(() => {
      this.debug('Reconnected!');
      this.propagateStateChange(HubConnectionState.Connected);
    });

    return defer(() => hubConnection.start()).pipe(
      tap(() => this.propagateStateChange(HubConnectionState.Connected)),
      tap(() => this.hubConnection.next(hubConnection)),
    );
  }

  invoke<T>(methodName: string, ...args: any[]): Observable<T> {
    return this.deferredHubConnection().pipe(switchMap(connection => connection.invoke(methodName, ...args)));
  }

  on<T>(methodName: string): Observable<T> {
    return this.deferredHubConnection().pipe(
      switchMap(
        connection =>
          new Observable<T>(observer => {
            const callback = (...args: any[]) => observer.next(...args);

            connection.on(methodName, callback);

            return () => connection.off(methodName, callback);
          }),
      ),
    );
  }

  private deferredHubConnection(): Observable<HubConnection> {
    return defer(() => this.hubConnection$).pipe(take(1));
  }

  private propagateStateChange(state: NetworkState): void {
    this.store.dispatch(changeConnectionState({ state }));
  }
}
