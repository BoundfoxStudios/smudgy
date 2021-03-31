import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStore } from './session.store';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SessionStore],
})
export class SessionComponent implements OnInit {
  readonly isReady$ = this.sessionStore.configuration$.pipe(
    map(configuration => !!configuration),
    startWith(false),
  );

  constructor(
    private readonly sessionStore: SessionStore,
    private readonly activatedRoute: ActivatedRoute,
    private readonly router: Router,
  ) {}

  ngOnInit(): void {
    const { sessionId } = this.activatedRoute.snapshot.queryParams;

    if (!sessionId) {
      this.sessionStore.createSession();
      return;
    }

    this.removeSessionIdFromQueryParameters();

    this.sessionStore.joinSession(sessionId);
  }

  private removeSessionIdFromQueryParameters(): void {
    void this.router.navigate([], {
      relativeTo: this.activatedRoute,
      queryParams: {},
      replaceUrl: true,
    });
  }
}
