import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SessionStore } from '../session/session.store';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PlayComponent {
  readonly players$ = this.sessionStore.players$;

  constructor(private readonly sessionStore: SessionStore) {}
}
