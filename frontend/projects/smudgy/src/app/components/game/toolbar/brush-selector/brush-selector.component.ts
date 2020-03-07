import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BrushSizes, brushSizeToNumber } from '../../../../models/brush-sizes';

interface BrushSizeViewModel {
  brushSize: BrushSizes;
  size: number;
}

@Component({
  selector: 'app-brush-selector',
  templateUrl: './brush-selector.component.html',
  styleUrls: ['./brush-selector.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrushSelectorComponent {
  @Output() selectBrushSize = new EventEmitter<BrushSizes>();
  brushSizeViewModel: BrushSizeViewModel;
  brushSizes: BrushSizeViewModel[] = Object.keys(BrushSizes)
    .filter(key => !isNaN(Number(BrushSizes[key])))
    .map(key => BrushSizes[key])
    .map(brushSize => ({ brushSize, size: brushSizeToNumber(brushSize) } as BrushSizeViewModel));

  @Input() set selectedBrushSize(brushSize: BrushSizes) {
    this.brushSizeViewModel = { brushSize, size: brushSizeToNumber(brushSize) };
  }

  select(brushSizeViewModel: BrushSizeViewModel): void {
    this.selectBrushSize.next(brushSizeViewModel.brushSize);
  }
}
