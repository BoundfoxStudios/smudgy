import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, pairwise, takeUntil, tap, throttleTime, withLatestFrom } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { brushSizeToNumber } from '../../../models/brush-size';
import { DrawCommand } from '../../../models/draw-command';
import { Point } from '../../../models/point';
import { NetworkDrawService } from './network-draw.service';
import { DrawingBoardStore } from '../components/drawing-board/drawing-board.store';
import { line } from 'bresenham-zingl';
import { colorToCSSHex } from '../../../models/color';

@Injectable()
export class DrawService implements OnDestroy {
  private readonly canvas: HTMLCanvasElement;
  private readonly canvasContext: CanvasRenderingContext2D;
  private readonly drawStream$ = new Subject<Point>();
  private readonly stopStream$ = new Subject<void>();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    private readonly networkDrawService: NetworkDrawService,
    private readonly drawingBoardStore: DrawingBoardStore,
  ) {
    this.canvas = elementRef.nativeElement;

    const canvasContext = this.canvas.getContext('2d');

    if (!canvasContext) {
      throw new Error('Error getting 2D context!');
    }

    this.canvasContext = canvasContext;
    this.prepareDrawingArea();
  }

  get context(): CanvasRenderingContext2D {
    return this.canvasContext;
  }

  startDrawing(): void {
    this.stopDrawing();

    this.drawStream$
      .pipe(
        distinctUntilChanged((a, b) => a.x === b.x && a.y === b.y),
        throttleTime(environment.gameConfiguration.canvasThrottleTime),
        withLatestFrom(this.drawingBoardStore.color$, this.drawingBoardStore.brushSize$, this.drawingBoardStore.tool$),
        map(
          ([point, color, brushSize, tool]) =>
            ({
              point,
              color,
              brushSize,
              tool,
            } as DrawCommand),
        ),
        pairwise(),
        tap(([previousCommand, nextCommand]) => this.internalDraw(previousCommand, nextCommand)),
        // tap(drawCommand => this.networkDrawService.draw(drawCommand)),
        takeUntil(this.stopStream$),
      )
      .subscribe({
        complete: () => this.networkDrawService.stopDrawing(),
      });
  }

  stopDrawing(): void {
    this.stopStream$.next();
  }

  draw(point: Point): void {
    this.drawStream$.next(point);
  }

  ngOnDestroy(): void {
    this.stopDrawing();
  }

  private internalDraw(previousCommand: DrawCommand, nextCommand: DrawCommand): void {
    const context = this.canvasContext;
    const { x: beforeX, y: beforeY } = previousCommand.point;
    const { x, y } = nextCommand.point;
    const drawSize = Math.floor(brushSizeToNumber(nextCommand.brushSize) / 2);

    context.fillStyle = colorToCSSHex(nextCommand.color);

    line(beforeX, beforeY, x, y, (nextX: number, nextY: number) => {
      context.fillRect(nextX - drawSize, nextY - drawSize, drawSize, drawSize);
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
}
