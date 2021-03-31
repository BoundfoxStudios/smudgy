import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { InputGroupComponent } from './components/input-group/input-group.component';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [CardComponent, InputGroupComponent, SpinnerComponent],
  exports: [CardComponent, InputGroupComponent, SpinnerComponent],
})
export class UiModule {}
