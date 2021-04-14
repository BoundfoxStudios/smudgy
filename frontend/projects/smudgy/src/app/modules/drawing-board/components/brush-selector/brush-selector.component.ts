import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { BrushSize, brushSizeToNumber } from '../../models/brush-size';

interface ViewModel {
  brushSize: BrushSize;
  size: number;
}

@Component({
  selector: 'app-brush-selector',
  templateUrl: './brush-selector.component.html',
  styleUrls: ['./brush-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BrushSelectorComponent {
  @Input() activeBrush: BrushSize = BrushSize.M;
  @Output() brushChange = new EventEmitter<BrushSize>();

  readonly brushSizes: ViewModel[] = Object.keys(BrushSize)
    .filter((key: string | number): key is string => isNaN(Number(key)))
    .map((key: any) => (BrushSize[key] as unknown) as BrushSize)
    .map(brushSize => ({ brushSize, size: brushSizeToNumber(brushSize) }))
    .sort((a, b) => (a.size > b.size ? -1 : 1));
}
