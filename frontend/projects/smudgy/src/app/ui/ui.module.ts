import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { ButtonDirective } from './directives/button.directive';
import { InputGroupDirective } from './directives/input-group.directive';
import { InputDirective } from './directives/input.directive';
import { LabelDirective } from './directives/label.directive';

@NgModule({
  declarations: [CardComponent, LabelDirective, InputGroupDirective, InputDirective, ButtonDirective],
  exports: [CardComponent, LabelDirective, InputGroupDirective, InputDirective, ButtonDirective],
})
export class UiModule {}
