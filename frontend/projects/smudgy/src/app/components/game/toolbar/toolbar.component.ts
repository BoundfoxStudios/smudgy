import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Colors, colorToCSSHex } from '../../../models/colors';
import { ToolbarService } from '../../../services/toolbar.service';

interface ColorViewModel {
  color: Colors;
  hex: string;
}

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  selectedColor: ColorViewModel = { color: this.toolbarService.color, hex: colorToCSSHex(this.toolbarService.color) };

  colors: ColorViewModel[] = Object.keys(Colors)
    .filter(key => !isNaN(Number(Colors[key])))
    .map(key => ({ color: Colors[key], hex: colorToCSSHex(Colors[key]) }));

  constructor(private readonly toolbarService: ToolbarService) {
  }

  selectColor(colorViewModel: ColorViewModel) {
    this.selectedColor = colorViewModel;
    this.toolbarService.color = colorViewModel.color;
  }
}
