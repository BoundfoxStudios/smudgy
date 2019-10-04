import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToolbarService],
})
export class GameComponent {
}
