import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { SessionConfiguration } from '../../session.model';
import { SessionStore } from '../session/session.store';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent {
  readonly inviteUrl$ = this.sessionStore.inviteUrl$;
  readonly players$ = this.sessionStore.players$;
  readonly sessionConfiguration$ = this.sessionStore.configuration$;
  readonly isConfigurationFormDisabled$ = this.sessionStore.isHost$.pipe(map(isHost => !isHost));
  readonly isStarting$ = this.sessionStore.isStarting$;

  constructor(
    private readonly router: Router,
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionStore: SessionStore,
  ) {}

  startGame(): void {
    this.sessionStore.startGame();
  }

  changeSessionConfiguration(sessionConfiguration: SessionConfiguration): void {
    this.sessionStore.changeSessionConfiguration(sessionConfiguration);
  }
}
