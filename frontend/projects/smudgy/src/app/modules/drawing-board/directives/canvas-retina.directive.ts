import { AfterViewInit, Directive, ElementRef, HostBinding, Input } from '@angular/core';

@Directive({
  selector: 'canvas[appCanvasRetina]',
})
export class CanvasRetinaDirective implements AfterViewInit {
  @Input() retinaWidth = 800;
  @Input() retinaHeight = 600;
  private readonly devicePixelRatio = window.devicePixelRatio || 1;

  constructor(private readonly elementRef: ElementRef<HTMLCanvasElement>) {}

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

  ngAfterViewInit(): void {
    const context = this.elementRef.nativeElement.getContext('2d');

    if (context) {
      context.scale(this.devicePixelRatio, this.devicePixelRatio);
    }
  }
}
