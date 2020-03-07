import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../models/shared/events';
import { SessionConfiguration } from '../models/shared/session-configuration';
import { SocketService } from './socket.service';

@Injectable()
export class SessionService {
  constructor(private readonly socketService: SocketService) {}

  createSession$(sessionConfiguration: SessionConfiguration): Observable<string> {
    return this.socketService.sendAndReceive$(Events.CreateSession, sessionConfiguration);
  }

  joinSession$(sessionId: string): Observable<SessionConfiguration> {
    return this.socketService.sendAndReceive$(Events.JoinSession, { sessionId });
  }
}
