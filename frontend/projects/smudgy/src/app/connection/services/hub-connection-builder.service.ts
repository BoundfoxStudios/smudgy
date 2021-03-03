import { Inject, Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IDebugger } from 'debug';
import { DebugService } from '../../debug/debug.service';
import { CONFIGURATION, ConnectionModuleConfiguration } from '../connection-module.configuration';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionBuilderService {
  private readonly debug: IDebugger;

  constructor(@Inject(CONFIGURATION) private readonly configuration: ConnectionModuleConfiguration, debugService: DebugService) {
    this.debug = debugService.derive('HubConnectionBuilderService');
  }

  createConnection(hubName: string): HubConnection {
    return new HubConnectionBuilder()
      .configureLogging({
        log: (logLevel, message) => this.debug(message),
      })
      .withUrl(`${this.configuration.hubUrl}${hubName}`)
      .withAutomaticReconnect(this.configuration.reconnectRetryDelays ?? [1000, 5000, 10000, 15000, 30000])
      .build();
  }
}
