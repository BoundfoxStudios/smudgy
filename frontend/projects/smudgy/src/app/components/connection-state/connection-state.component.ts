import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ConnectionState, HubService } from '../../services/hubs/hub.service';

@Component({
  selector: 'app-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionStateComponent implements OnInit {
  state$: Observable<ConnectionState>;
  stateClass$: Observable<string[]>;
  readonly faWifi = faWifi;

  constructor(private readonly hubService: HubService) {}

  ngOnInit(): void {
    this.state$ = this.hubService.state$;
    this.stateClass$ = this.state$.pipe(map((state) => [state]));
  }
}
