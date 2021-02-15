import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'input[appInput], select[appSelect]',
})
export class InputDirective {
  @HostBinding('class')
  readonly styles = 'mt-2 p-2 px-4 bg-smudgy-elevation-0 rounded-2xl outline-none';
}
