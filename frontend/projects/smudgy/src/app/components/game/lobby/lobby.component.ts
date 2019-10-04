import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SessionConfiguration, SessionLanguage } from '../../../models/shared/session-configuration';
import { SessionService } from '../../../services/session.service';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LobbyComponent implements OnInit {
  sessionConfiguration: SessionConfiguration = {
    language: SessionLanguage.German,
    roundTimeInSeconds: 60,
    roundsToPlay: 5,
  };

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly sessionService: SessionService,
  ) {
  }

  ngOnInit(): void {
    const { sessionId } = this.activatedRoute.snapshot.queryParams;

    if (!sessionId) {
      this.sessionService.createSession$(this.sessionConfiguration).subscribe();
      return;
    }

    // TODO: Join existing session!
  }
}
