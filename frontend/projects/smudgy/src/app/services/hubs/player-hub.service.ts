import { Injectable } from '@angular/core';
import { defer, Observable } from 'rxjs';
import { DebugService } from '../debug.service';
import { BaseHubService } from './base-hub.service';
import { HubConnectionBuilderService } from './hub-connection-builder.service';

@Injectable({
  providedIn: 'root',
})
export class PlayerHubService extends BaseHubService {
  constructor(hubConnectionBuilderService: HubConnectionBuilderService, debugService: DebugService) {
    super('player', hubConnectionBuilderService, debugService.derive('PlayerHubService'));
  }

  register$(id: string, name: string): Observable<boolean> {
    return defer(() => this.hubConnection.invoke('Register', id, name));
  }
}
