import { ElementRef, Injectable, OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, tap, throttleTime } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Point } from '../models/point';

@Injectable()
export class DrawService implements OnDestroy {
  private readonly canvas: HTMLCanvasElement;
  private readonly context: CanvasRenderingContext2D;
  private readonly drawStream = new Subject<Point>();
  private drawSubscription = Subscription.EMPTY;
  private lastDrawnPoint: Point;

  constructor(elementRef: ElementRef<HTMLCanvasElement>) {
    this.canvas = elementRef.nativeElement;
    this.context = this.canvas.getContext('2d');
  }

  startDrawing(): void {
    this.stopDrawing();

    this.lastDrawnPoint = undefined;

    this.drawSubscription = this.drawStream.pipe(
      distinctUntilChanged((a, b) => a.x === b.x && a.y === b.y),
      throttleTime(environment.gameConfiguration.canvasThrottleTime),
      tap(point => this.internalDraw(point)),
    ).subscribe();
  }

  stopDrawing(): void {
    this.drawSubscription.unsubscribe();
    this.drawSubscription = Subscription.EMPTY;
  }

  draw(point: Point): void {
    this.drawStream.next(point);
  }

  ngOnDestroy(): void {
    this.drawSubscription.unsubscribe();
  }

  private internalDraw(point: Point): void {
    if (!this.lastDrawnPoint) {
      this.lastDrawnPoint = point;
      return;
    }

    const context = this.context;
    const { x: lastX, y: lastY } = this.lastDrawnPoint;
    const { x, y } = point;

    console.log(`should draw, from ${lastX},${lastY} to ${x},${y}`);

    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(x, y);
    context.strokeStyle = 'black';
    context.lineWidth = 2;
    context.stroke();
    context.closePath();

    this.lastDrawnPoint = point;
  }
}
