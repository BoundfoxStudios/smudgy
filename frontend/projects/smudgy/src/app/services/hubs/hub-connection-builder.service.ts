import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { IDebugger } from 'debug';
import { environment } from '../../../environments/environment';
import { DebugService } from '../debug.service';

@Injectable({
  providedIn: 'root',
})
export class HubConnectionBuilderService {
  private readonly debug: IDebugger;

  constructor(debugService: DebugService) {
    this.debug = debugService.derive('HubConnectionBuilderService');
  }

  createConnection(hubName: string): HubConnection {
    return new HubConnectionBuilder()
      .configureLogging({
        log: (logLevel, message) => this.debug(message),
      })
      .withUrl(`${environment.gameConfiguration.hubsBaseUrl}${hubName}`)
      .withAutomaticReconnect([1000, 5000, 10000, 15000, 30000])
      .build();
  }
}
