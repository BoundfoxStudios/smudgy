import { Directive, HostBinding, Input } from '@angular/core';
import { DrawService } from '../services/draw.service';

@Directive({
  selector: 'canvas[appCanvasRetina]',
})
export class CanvasRetinaDirective {
  @Input() retinaWidth = 800;
  @Input() retinaHeight = 600;
  private readonly devicePixelRatio = window.devicePixelRatio || 1;

  constructor(private readonly drawService: DrawService) {
    this.drawService.context.scale(this.devicePixelRatio, this.devicePixelRatio);
  }

  @HostBinding('style.width.px')
  get cssWidth(): number {
    return this.retinaWidth;
  }

  @HostBinding('style.height.px')
  get cssHeight(): number {
    return this.retinaHeight;
  }

  @HostBinding('height')
  get canvasHeight(): number {
    return this.retinaHeight * this.devicePixelRatio;
  }

  @HostBinding('width')
  get canvasWidth(): number {
    return this.retinaWidth * this.devicePixelRatio;
  }
}
