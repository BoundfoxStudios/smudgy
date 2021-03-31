import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NetworkDrawService } from '../../../modules/drawing-board/services/network-draw.service';
import { ToolbarService } from '../../../modules/drawing-board/services/toolbar.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToolbarService, NetworkDrawService],
})
export class PlayComponent {}
