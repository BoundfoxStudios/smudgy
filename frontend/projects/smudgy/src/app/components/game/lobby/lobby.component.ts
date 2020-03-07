import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock, faFlag, faHistory, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IDebugger } from 'debug';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SessionLanguage } from '../../../models/shared/session-configuration';
import { DebugService } from '../../../services/debug.service';
import { SessionService } from '../../../services/session.service';
import { AbstractDestroyable } from '../../abstract-destroyable';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent extends AbstractDestroyable implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    language: [SessionLanguage.German],
    roundTimeInSeconds: [30],
    roundsToPlay: [5],
    maxPlayers: [5],
  });

  readonly SessionLanguage = SessionLanguage;
  readonly faFlag = faFlag;
  readonly faClock = faClock;
  readonly faHistory = faHistory;
  readonly faUsers = faUsers;
  private readonly debug: IDebugger;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    private readonly formBuilder: FormBuilder,
    debugService: DebugService,
  ) {
    super();
    this.debug = debugService.derive('LobbyComponent');
  }

  ngOnInit(): void {
    const { sessionId } = this.activatedRoute.snapshot.queryParams;

    if (!sessionId) {
      this.sessionService
        .createSession$(this.form.value)
        .pipe(
          switchMap(serverSessionId => {
            this.debug('Setting session id %s', serverSessionId);

            this.joinSession(serverSessionId);

            return this.router.navigate([], {
              relativeTo: this.activatedRoute,
              queryParams: { sessionId: serverSessionId },
              replaceUrl: true,
            });
          }),
        )
        .subscribe();
      return;
    }

    this.joinSession(sessionId);
  }

  private joinSession(sessionId: string): void {
    // TODO: Show a message before going back to the main menu
    this.sessionService.joinSession$(sessionId).subscribe({ error: () => this.router.navigate(['/']) });

    this.form.valueChanges
      .pipe(
        switchMap(sessionConfiguration => this.sessionService.updateSessionConfiguration$(sessionConfiguration)),
        takeUntil(this.destroy$),
      )
      .subscribe();

    this.sessionService
      .sessionConfiguration$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(sessionConfiguration => this.form.setValue(sessionConfiguration, { emitEvent: false }));
  }
}
