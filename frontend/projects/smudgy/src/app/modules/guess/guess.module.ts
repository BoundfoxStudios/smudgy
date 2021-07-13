import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { GuessComponent } from './components/guess/guess.component';

@NgModule({
  declarations: [GuessComponent],
  imports: [CommonModule],
  exports: [GuessComponent],
})
export class GuessModule {}
