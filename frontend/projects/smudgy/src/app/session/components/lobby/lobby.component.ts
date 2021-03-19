import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';
import { AbstractDestroyable } from '../../../components/abstract-destroyable';
import { SessionConfiguration } from '../../session.model';
import { SessionStore } from '../session/session.store';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent extends AbstractDestroyable implements OnInit {
  readonly inviteUrl$ = this.sessionStore.inviteUrl$;
  readonly players$ = this.sessionStore.players$;

  isConfigurationFormDisabled = false;
  sessionConfiguration?: SessionConfiguration;

  constructor(private readonly router: Router, private readonly sessionStore: SessionStore) {
    super();
  }

  startGame(): void {
    // TODO: Start game
  }

  ngOnInit(): void {
    this.sessionStore.configuration$.pipe(takeUntil(this.destroy$)).subscribe(configuration => (this.sessionConfiguration = configuration));

    this.sessionStore.isHost$.pipe(takeUntil(this.destroy$)).subscribe(isHost => (this.isConfigurationFormDisabled = !isHost));
  }

  changeSessionConfiguration(sessionConfiguration: SessionConfiguration): void {
    this.sessionStore.changeSessionConfiguration(sessionConfiguration);
  }
}
