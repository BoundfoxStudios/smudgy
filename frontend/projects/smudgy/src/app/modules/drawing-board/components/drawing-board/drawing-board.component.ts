import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { NetworkDrawService } from '../../services/network-draw.service';
import { DrawingBoardStore } from './drawing-board.store';
import { Point } from '../../models/point';
import { DrawService } from '../../services/draw.service';

@Component({
  selector: 'app-drawing-board',
  templateUrl: './drawing-board.component.html',
  styleUrls: ['./drawing-board.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawService, NetworkDrawService, DrawingBoardStore],
})
export class DrawingBoardComponent implements AfterViewInit {
  width = 800;
  height = 600;

  @ViewChild('canvas', { static: true })
  canvas?: ElementRef<HTMLCanvasElement>;

  constructor(
    readonly store: DrawingBoardStore,
    private readonly drawService: DrawService,
    private readonly networkDrawService: NetworkDrawService,
  ) {}

  drawingStart(): void {
    this.store.startDrawing();
  }

  drawingStop(): void {
    this.store.stopDrawing();
  }

  drawing(point: Point): void {
    this.store.draw(point);
  }

  ngAfterViewInit(): void {
    if (this.canvas) {
      this.drawService.initialize(this.canvas.nativeElement);
      this.networkDrawService.initialize();
    }
  }
}
