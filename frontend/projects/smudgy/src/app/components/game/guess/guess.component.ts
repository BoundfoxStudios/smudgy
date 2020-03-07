import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-guess',
  templateUrl: './guess.component.html',
  styleUrls: ['./guess.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GuessComponent {}
