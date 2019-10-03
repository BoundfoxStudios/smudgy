import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawComponent {
}
