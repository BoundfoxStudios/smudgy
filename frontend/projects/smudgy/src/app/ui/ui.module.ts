import { NgModule } from '@angular/core';
import { CardComponent } from './components/card/card.component';
import { InputGroupComponent } from './components/input-group/input-group.component';

@NgModule({
  declarations: [CardComponent, InputGroupComponent],
  exports: [CardComponent, InputGroupComponent],
})
export class UiModule {}
