import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NetworkDrawService } from '../../../services/network-draw.service';
import { ToolbarService } from '../../../services/toolbar.service';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ToolbarService, NetworkDrawService],
})
export class PlayComponent {}
