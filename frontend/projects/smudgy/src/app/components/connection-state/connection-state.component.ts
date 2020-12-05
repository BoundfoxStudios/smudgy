import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionState } from '../../services/hubs/base-hub.service';
import { PlayerHubService } from '../../services/hubs/player-hub.service';

@Component({
  selector: 'app-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionStateComponent implements OnInit {
  state$: Observable<ConnectionState>;
  stateClass$: Observable<string[]>;
  readonly faWifi = faWifi;

  constructor(private readonly playerHubService: PlayerHubService) {}

  ngOnInit(): void {
    this.state$ = this.playerHubService.state$;
    this.stateClass$ = this.state$.pipe(map(state => [state]));
  }
}
