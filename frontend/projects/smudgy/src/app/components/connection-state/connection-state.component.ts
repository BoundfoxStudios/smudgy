import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SocketService, SocketState } from '../../services/socket.service';

@Component({
  selector: 'app-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionStateComponent implements OnInit {
  state$: Observable<SocketState>;
  stateClass$: Observable<string[]>;
  readonly faWifi = faWifi;

  constructor(private readonly socketService: SocketService) {}

  ngOnInit() {
    this.state$ = this.socketService.state$;
    this.stateClass$ = this.state$.pipe(map(state => [state]));
  }
}
