import { Inject, Injectable } from '@angular/core';
import { CONFIGURATION, ConnectionModuleConfiguration } from '../../connection/connection-module.configuration';
import { SocketService } from '../../connection/services/socket.service';
import { DebugService } from '../../debug/debug.service';
import { Store } from '@ngrx/store';
import { ConnectionState } from '../../connection/store/connection.state';

@Injectable()
export class SessionSocketService extends SocketService {
  constructor(
    @Inject(CONFIGURATION) configuration: ConnectionModuleConfiguration,
    store: Store<ConnectionState>,
    debugService: DebugService,
  ) {
    super(configuration, 'session', store, debugService);
  }
}
