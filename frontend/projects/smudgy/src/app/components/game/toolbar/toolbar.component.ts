import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BrushSizes } from '../../../models/brush-sizes';
import { Colors } from '../../../models/colors';
import { ToolbarService } from '../../../modules/drawing-board/services/toolbar.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolbarComponent {
  selectedColor: Colors = this.toolbarService.color;
  selectedBrushSize: BrushSizes = this.toolbarService.brushSize;

  constructor(private readonly toolbarService: ToolbarService) {}

  selectColor(color: Colors): void {
    this.toolbarService.color = this.selectedColor = color;
  }

  selectBrushSize(brushSize: BrushSizes): void {
    this.toolbarService.brushSize = this.selectedBrushSize = brushSize;
  }
}
