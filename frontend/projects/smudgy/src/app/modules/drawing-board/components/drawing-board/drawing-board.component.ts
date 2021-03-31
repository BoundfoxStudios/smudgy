import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NetworkDrawService } from '../../services/network-draw.service';
import { ToolbarService } from '../../services/toolbar.service';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetworkDrawService, ToolbarService],
})
export class DrawingBoardComponent {
  width = 800;
  height = 600;
}
