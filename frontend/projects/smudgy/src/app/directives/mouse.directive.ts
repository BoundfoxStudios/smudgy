import { Directive, HostListener } from '@angular/core';
import { DrawService } from '../services/draw.service';

const LEFT_MOUSE_BUTTON = 0;

@Directive({
  selector: 'canvas[appMouse]',
})
export class MouseDirective {
  private isDrawing: boolean;

  constructor(private readonly drawService: DrawService) {}

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

    this.drawService.startDrawing();
    this.isDrawing = true;
  }

  @HostListener('mouseup')
  mouseUp(): void {
    this.isDrawing = false;
    this.drawService.stopDrawing();
  }

  @HostListener('mousemove', ['$event'])
  mouseMove({ offsetX: x, offsetY: y }: MouseEvent): void {
    if (!this.isDrawing) {
      return;
    }

    this.drawService.draw({ x, y });
  }
}
