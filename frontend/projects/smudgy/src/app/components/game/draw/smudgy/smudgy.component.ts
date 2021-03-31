import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DrawService } from '../../../../modules/drawing-board/services/draw.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'canvas[appSmudgy]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawService],
})
export class SmudgyComponent {}
