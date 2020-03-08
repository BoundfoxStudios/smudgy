import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[appButton]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {}
