import { Directive } from '@angular/core';
import { DrawService } from '../services/draw.service';

@Directive({
  selector: 'canvas[appDrawServiceProvider]',
  providers: [DrawService],
})
export class DrawServiceProviderDirective {}
