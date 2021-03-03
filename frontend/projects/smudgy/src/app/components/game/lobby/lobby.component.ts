import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { faClock, faFlag, faHistory, faUsers } from '@fortawesome/free-solid-svg-icons';
import { IDebugger } from 'debug';
import { BehaviorSubject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { SessionLanguage } from '../../../models/network/session-configuration';
import { DebugService } from '../../../debug/debug.service';
import { SessionService } from '../../../services/session.service';
import { AbstractDestroyable } from '../../abstract-destroyable';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent extends AbstractDestroyable implements OnInit, OnDestroy {
  form = this.formBuilder.group({
    language: [SessionLanguage.German],
    roundTimeInSeconds: [60],
    roundsToPlay: [5],
    maxPlayers: [5],
  });

  readonly sessionJoined$ = new BehaviorSubject<boolean>(false);
  inviteUrl: string;
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
      this.debug('No session found, creating a new one.');
      this.sessionService
        .createSession$(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe(serverSessionId => this.joinSession(serverSessionId));
      return;
    }

    void this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
      replaceUrl: true,
    });

    this.joinSession(sessionId);
  }

  startGame(): void {
    this.sessionService.startGame$().pipe(takeUntil(this.destroy$)).subscribe();
  }

  private joinSession(sessionId: string): void {
    this.inviteUrl = `${window.location.origin}/game/lobby?sessionId=${sessionId}`;

    // TODO: Show a message before going back to the main menu
    this.sessionService
      .joinSession$(sessionId)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        sessionConfiguration => {
          this.debug('Joined session, got configuration %o', sessionConfiguration);
          this.sessionJoined$.next(true);
          this.form.setValue(sessionConfiguration, { emitEvent: false });
        },
        () => this.router.navigate(['/']),
      );

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

    this.sessionService
      .gameStarted$()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.router.navigate(['/game/play']));
  }
}
