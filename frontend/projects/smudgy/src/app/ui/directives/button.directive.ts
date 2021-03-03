import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'button[appButton]',
})
export class ButtonDirective {
  @HostBinding('class')
  readonly styles = 'p-3 bg-smudgy-red text-smudgy-white rounded-2xl shadow-xl focus:outline-none hover:bg-opacity-75 transition';
}
