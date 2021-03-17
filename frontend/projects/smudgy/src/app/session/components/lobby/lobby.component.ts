import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { faClock, faFlag, faHistory, faUsers } from '@fortawesome/free-solid-svg-icons';
import { takeUntil } from 'rxjs/operators';
import { AbstractDestroyable } from '../../../components/abstract-destroyable';
import { SessionLanguage } from '../../session.model';
import { SessionStore } from '../session/session.store';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent extends AbstractDestroyable implements OnInit {
  form = this.formBuilder.group({
    language: [],
    roundTimeInSeconds: [],
    roundsToPlay: [],
    maxPlayers: [],
  });

  readonly inviteUrl$ = this.sessionStore.inviteUrl$;
  readonly SessionLanguage = SessionLanguage;
  readonly faFlag = faFlag;
  readonly faClock = faClock;
  readonly faHistory = faHistory;
  readonly faUsers = faUsers;
  readonly players$ = this.sessionStore.players$;

  constructor(private readonly router: Router, private readonly formBuilder: FormBuilder, private readonly sessionStore: SessionStore) {
    super();
  }

  startGame(): void {
    // TODO: Start game
  }

  ngOnInit(): void {
    this.sessionStore.configuration$
      .pipe(takeUntil(this.destroy$))
      .subscribe(configuration => this.form.setValue(configuration, { emitEvent: false }));

    this.form.valueChanges
      .pipe(takeUntil(this.destroy$))
      .subscribe(sessionConfiguration => this.sessionStore.changeSessionConfiguration(sessionConfiguration));

    this.sessionStore.isHost$.pipe(takeUntil(this.destroy$)).subscribe(isHost => {
      if (isHost) {
        this.form.enable();
        return;
      }

      this.form.disable();
    });
  }
}
