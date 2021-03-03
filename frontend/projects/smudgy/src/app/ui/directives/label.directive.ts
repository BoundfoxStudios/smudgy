import { Directive, HostBinding } from '@angular/core';

@Directive({
  selector: 'label[appLabel]',
})
export class LabelDirective {
  @HostBinding('class')
  readonly styles = 'text-smudgy-elevation-3';
}
