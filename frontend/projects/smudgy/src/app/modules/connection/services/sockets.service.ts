import { Inject, Injectable } from '@angular/core';
import { SOCKET_SERVICE, SocketService } from './socket.service';
import { from, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketsService {
  constructor(@Inject(SOCKET_SERVICE) private readonly socketServices: SocketService[]) {
    console.log(socketServices.length);
  }

  initialize(): Observable<void> {
    return from(this.socketServices).pipe(mergeMap(socketService => socketService.initialize()));
  }
}
