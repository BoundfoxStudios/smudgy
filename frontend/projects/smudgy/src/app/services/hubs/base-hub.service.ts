import { HubConnection, HubConnectionState } from '@microsoft/signalr';
import { IDebugger } from 'debug';
import { BehaviorSubject, defer, EMPTY, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Initializable } from '../initializable';
import { HubConnectionBuilderService } from './hub-connection-builder.service';

export type ConnectionState = HubConnectionState.Disconnected | HubConnectionState.Connecting | HubConnectionState.Connected;

export abstract class BaseHubService implements Initializable {
  protected hubConnection: HubConnection;
  private state = new BehaviorSubject<ConnectionState>(HubConnectionState.Disconnected);
  state$ = this.state.asObservable();

  protected constructor(
    private readonly hubName: string,
    private readonly hubConnectionBuilderService: HubConnectionBuilderService,
    protected readonly debug: IDebugger,
  ) {}

  initialize$(): Observable<void> {
    if (this.hubConnection) {
      return EMPTY;
    }

    this.hubConnection = this.hubConnectionBuilderService.createConnection(this.hubName);

    this.hubConnection.onclose(error => {
      this.debug('Connection closed. %o', error);
      this.propagateStateChange(HubConnectionState.Disconnected);
    });

    this.hubConnection.onreconnecting(error => {
      if (error) {
        this.debug('Reconnecting due to error %o', error);
      } else {
        this.debug('Reconnecting...');
      }

      this.propagateStateChange(HubConnectionState.Connecting);
    });

    this.hubConnection.onreconnected(() => {
      this.debug('Reconnected!');
      this.propagateStateChange(HubConnectionState.Connected);
    });

    return defer(() => this.hubConnection.start()).pipe(tap(() => this.propagateStateChange(HubConnectionState.Connected)));
  }

  private propagateStateChange(state: ConnectionState): void {
    this.state.next(state);
  }
}
