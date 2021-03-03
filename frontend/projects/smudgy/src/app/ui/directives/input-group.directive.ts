import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'div[appInputGroup]',
})
export class InputGroupDirective {
  @HostBinding('class')
  readonly styles = 'flex flex-col';
}
