import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { Point } from '../../../models/point';

const LEFT_MOUSE_BUTTON = 0;

@Directive({
  selector: 'canvas[appMouse]',
})
export class MouseDirective {
  private isDrawing = false;

  @Output() startDraw = new EventEmitter<void>();
  @Output() endDraw = new EventEmitter<void>();
  @Output() draw = new EventEmitter<Point>();

  @HostListener('contextmenu')
  contextMenu(): boolean {
    return false;
  }

  @HostListener('mousedown', ['$event'])
  mouseDown({ button }: MouseEvent): void {
    if (button !== LEFT_MOUSE_BUTTON) {
      this.isDrawing = false;
      return;
    }

    this.isDrawing = true;
    this.startDraw.emit();
  }

  @HostListener('mouseup')
  mouseUp(): void {
    this.isDrawing = false;
    this.endDraw.emit();
  }

  @HostListener('mousemove', ['$event'])
  mouseMove({ offsetX: x, offsetY: y }: MouseEvent): void {
    if (!this.isDrawing) {
      return;
    }

    this.draw.emit({ x, y });
  }
}
