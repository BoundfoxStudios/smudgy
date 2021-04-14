import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { throttleTime } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { brushSizeToNumber } from '../../../models/brush-size';
import { DrawCommand } from '../../../models/draw-command';
import { DrawingBoardStore } from '../components/drawing-board/drawing-board.store';
import { line } from 'bresenham-zingl';
import { colorToCSSHex } from '../../../models/color';

@Injectable()
export class DrawService implements OnDestroy {
  // TODO: This should be ? rather than !
  private canvas!: HTMLCanvasElement;
  private canvasContext!: CanvasRenderingContext2D;
  private drawingSubscription = Subscription.EMPTY;

  constructor(private readonly drawingBoardStore: DrawingBoardStore) {}

  get context(): CanvasRenderingContext2D {
    return this.canvasContext;
  }

  initialize(canvasElement: HTMLCanvasElement): void {
    this.canvas = canvasElement;

    const canvasContext = this.canvas.getContext('2d');

    if (!canvasContext) {
      throw new Error('Error getting 2D context!');
    }

    this.canvasContext = canvasContext;
    this.prepareDrawingArea();
    this.subscribeToDrawingStream();
  }

  draw([previousCommand, nextCommand]: [DrawCommand, DrawCommand]): void {
    const { x: beforeX, y: beforeY } = previousCommand.point;
    const { x, y } = nextCommand.point;
    const drawSize = Math.floor(brushSizeToNumber(nextCommand.brushSize) / 2);

    this.context.fillStyle = colorToCSSHex(nextCommand.color);

    line(beforeX, beforeY, x, y, (nextX: number, nextY: number) => {
      this.context.fillRect(nextX - drawSize, nextY - drawSize, drawSize, drawSize);
    });
  }

  private prepareDrawingArea(): void {
    // We need to wait for the current task queue to be resolved before we can prepare the drawing area.
    void Promise.resolve().then(() => {
      const context = this.canvasContext;

      context.fillStyle = '#ffffff';
      context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    });
  }

  private subscribeToDrawingStream(): void {
    this.drawingSubscription = this.drawingBoardStore.nextDrawCommandPair$
      .pipe(throttleTime(environment.gameConfiguration.canvasThrottleTime))
      .subscribe(pair => this.draw(pair));
  }

  ngOnDestroy(): void {
    this.drawingSubscription.unsubscribe();
  }
}
