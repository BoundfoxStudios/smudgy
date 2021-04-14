import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Color, colorToCSSHex } from '../../models/color';

interface ViewModel {
  color: Color;
  hex: string;
}

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectorComponent {
  @Input() set activeColor(color: Color) {
    this.viewModel = { color, hex: colorToCSSHex(color) };
  }

  @Output() colorChange = new EventEmitter<Color>();

  viewModel: ViewModel = { color: Color.Black, hex: colorToCSSHex(Color.Black) };

  readonly colors: ViewModel[] = Object.keys(Color)
    .filter((key: string | number): key is string => isNaN(Number(key)))
    .map((key: any) => (Color[key] as unknown) as Color)
    .map(color => ({ color, hex: colorToCSSHex(color) }));
}
