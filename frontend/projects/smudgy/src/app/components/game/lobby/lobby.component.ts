import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDebugger } from 'debug';
import { switchMap } from 'rxjs/operators';
import { SessionConfiguration, SessionLanguage } from '../../../models/shared/session-configuration';
import { DebugService } from '../../../services/debug.service';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: [ './lobby.component.scss' ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent implements OnInit {
  sessionConfiguration: SessionConfiguration = {
    language: SessionLanguage.German,
    roundTimeInSeconds: 60,
    roundsToPlay: 5,
  };

  private readonly debug: IDebugger;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
    private readonly router: Router,
    debugService: DebugService,
  ) {
    this.debug = debugService.derive('LobbyComponent');
  }

  ngOnInit(): void {
    const { sessionId } = this.activatedRoute.snapshot.queryParams;

    if (!sessionId) {
      this.sessionService.createSession$(this.sessionConfiguration)
        .pipe(switchMap(serverSessionId => {
          this.debug('Setting session id %s', serverSessionId);

          return this.router.navigate([], {
            relativeTo: this.activatedRoute,
            queryParams: { sessionId: serverSessionId },
            replaceUrl: true,
          });
        }))
        .subscribe();
      return;
    }

    console.log('jetzt sin wir hier');
    // TODO: Join existing session!
  }
}
