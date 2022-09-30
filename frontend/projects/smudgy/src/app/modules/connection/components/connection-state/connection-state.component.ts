import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { faWifi } from '@fortawesome/free-solid-svg-icons';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { selectConnectionState } from '../../store/connection.selectors';
import { ConnectionState } from '../../store/connection.state';
import { NetworkState } from '../../models/network-state';

@Component({
  selector: 'app-connection-state',
  templateUrl: './connection-state.component.html',
  styleUrls: ['./connection-state.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConnectionStateComponent implements OnInit {
  state$?: Observable<NetworkState>;
  stateClass$?: Observable<string[]>;
  readonly faWifi = faWifi;

  constructor(private readonly store: Store<ConnectionState>) {}

  ngOnInit(): void {
    this.state$ = this.store.select(selectConnectionState);
    this.stateClass$ = this.state$.pipe(map(state => [state]));
  }
}
