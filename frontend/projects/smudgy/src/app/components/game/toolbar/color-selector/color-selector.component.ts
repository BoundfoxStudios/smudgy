import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Colors, colorToCSSHex } from '../../../../models/colors';

interface ColorViewModel {
  color: Colors;
  hex: string;
}

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectorComponent {
  @Output() selectColor = new EventEmitter<Colors>();
  colorViewModel: ColorViewModel;
  colors: ColorViewModel[] = Object.keys(Colors)
    .filter(key => !isNaN(Number(Colors[key])))
    .map(key => Colors[key])
    .map(color => ({ color, hex: colorToCSSHex(color) } as ColorViewModel));

  @Input() set selectedColor(color: Colors) {
    this.colorViewModel = { color, hex: colorToCSSHex(color) };
  }

  select(colorViewModel: ColorViewModel) {
    this.selectColor.next(colorViewModel.color);
  }
}
