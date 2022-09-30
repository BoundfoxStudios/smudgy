import { Inject, Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { CONFIGURATION, ConnectionModuleConfiguration } from '../../connection/connection-module.configuration';
import { SocketService } from '../../connection/services/socket.service';
import { ConnectionState } from '../../connection/store/connection.state';
import { DebugService } from '../../debug/debug.service';

@Injectable()
export class PlayerSocketService extends SocketService {
  constructor(
    @Inject(CONFIGURATION) configuration: ConnectionModuleConfiguration,
    store: Store<ConnectionState>,
    debugService: DebugService,
  ) {
    super(configuration, 'player', store, debugService);
  }
}
