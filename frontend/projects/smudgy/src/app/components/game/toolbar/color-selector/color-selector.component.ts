import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Colors, colorToCSSHex } from '../../../../models/colors';

interface ColorViewModel {
  color: Colors;
  hex: string;
}

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorSelectorComponent {
  @Output() selectColor = new EventEmitter<Colors>();
  colorViewModel: ColorViewModel = { color: Colors.Black, hex: colorToCSSHex(Colors.Black) };
  colors: ColorViewModel[] = Object.keys(Colors)
    .filter((key: any) => !isNaN(Number(Colors[key])))
    .map((key: any) => (Colors[key] as unknown) as Colors)
    .map(color => ({ color, hex: colorToCSSHex(color) } as ColorViewModel));

  @Input() set selectedColor(color: Colors) {
    this.colorViewModel = { color, hex: colorToCSSHex(color) };
  }

  select(colorViewModel: ColorViewModel): void {
    this.selectColor.next(colorViewModel.color);
  }
}
