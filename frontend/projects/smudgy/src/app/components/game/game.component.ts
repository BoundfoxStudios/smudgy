import { ChangeDetectionStrategy, Component } from '@angular/core';
import { SessionService } from '../../services/session.service';

@Component({
  selector: 'app-game',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [SessionService],
})
export class GameComponent {}
