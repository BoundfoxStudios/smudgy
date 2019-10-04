import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { distinctUntilChanged, map, pairwise, takeUntil, tap, throttleTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { brushSizeToNumber } from '../models/brush-sizes';
import { colorToCSSHex } from '../models/colors';
import { DrawCommand } from '../models/draw-command';
import { Point } from '../models/point';
import { NetworkDrawService } from './network-draw.service';
import { ToolbarService } from './toolbar.service';

@Injectable()
export class DrawService implements OnDestroy {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly drawStream = new Subject<Point>();
  private readonly stopStream = new Subject<void>();

  constructor(
    elementRef: ElementRef<HTMLCanvasElement>,
    private readonly networkDrawService: NetworkDrawService,
    private readonly toolbarService: ToolbarService,
  ) {
    this.canvas = elementRef.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  startDrawing(): void {
    this.stopDrawing();

    this.drawStream.pipe(
      distinctUntilChanged((a, b) => a.x === b.x && a.y === b.y),
      throttleTime(environment.gameConfiguration.canvasThrottleTime),
      map(point => (
        {
          point,
          color: this.toolbarService.color,
          brushSize: this.toolbarService.brushSize,
          tool: this.toolbarService.tool,
        }) as DrawCommand),
      tap(point => this.internalDraw(point)),
      tap(point => this.networkDrawService.draw(point)),
      takeUntil(this.stopStream),
    ).subscribe({
      complete: () => this.networkDrawService.stopDrawing(),
    });

    this.networkDrawService.startDrawing();
  }

  stopDrawing(): void {
    this.stopStream.next();
  }

  draw(point: Point): void {
    this.drawStream.next(point);
  }

  ngOnDestroy(): void {
    this.stopDrawing();
  }

  private internalDraw(drawCommand: DrawCommand): void {
    const context = this.context;
    const { x, y } = drawCommand.point;

    context.beginPath();
    context.arc(x, y, brushSizeToNumber(drawCommand.brushSize), 0, Math.PI * 2);
    context.fillStyle = colorToCSSHex(drawCommand.color);
    context.fill();
    context.closePath();
  }
}
