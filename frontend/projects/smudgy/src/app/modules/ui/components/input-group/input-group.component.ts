import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-input-group',
  templateUrl: './input-group.component.html',
  styleUrls: ['./input-group.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputGroupComponent {}