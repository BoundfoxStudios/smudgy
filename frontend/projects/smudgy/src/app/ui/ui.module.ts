import { NgModule } from '@angular/core';
import { ButtonDirective } from './directives/button.directive';
import { InputGroupDirective } from './directives/input-group.directive';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label.directive';

@NgModule({
  declarations: [LabelDirective, InputGroupDirective, InputDirective, ButtonDirective],
  exports: [LabelDirective, InputGroupDirective, InputDirective, ButtonDirective],
})
export class UiModule {}
