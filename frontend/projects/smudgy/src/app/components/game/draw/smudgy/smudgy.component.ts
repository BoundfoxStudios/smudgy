import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DrawService } from '../../../../services/draw.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'canvas[appSmudgy]',
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawService],
})
export class SmudgyComponent {}
