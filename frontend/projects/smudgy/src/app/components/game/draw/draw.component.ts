import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { DrawService } from '../../../services/draw.service';

@Component({
  selector: 'app-draw',
  templateUrl: './draw.component.html',
  styleUrls: ['./draw.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [DrawService],
})
export class DrawComponent {
}
