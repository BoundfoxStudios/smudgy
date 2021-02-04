import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DrawComponent {
  width = 800;
  height = 600;
}
