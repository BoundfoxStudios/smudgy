import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SessionStore } from './session.store';

@Component({
  selector: 'app-session',
  template: '<router-outlet></router-outlet>',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SessionStore],
})
export class SessionComponent implements OnInit {
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
