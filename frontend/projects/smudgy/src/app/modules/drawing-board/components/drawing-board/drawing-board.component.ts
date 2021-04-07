import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NetworkDrawService } from '../../services/network-draw.service';
import { DrawingBoardStore } from './drawing-board.store';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [NetworkDrawService, DrawingBoardStore],
})
export class DrawingBoardComponent {
  width = 800;
  height = 600;

  constructor(readonly store: DrawingBoardStore) {}
}
