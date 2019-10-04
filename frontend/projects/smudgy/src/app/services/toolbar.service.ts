import { Injectable } from '@angular/core';
import { BrushSizes } from '../models/brush-sizes';
import { Colors } from '../models/colors';
import { Tools } from '../models/tools';

@Injectable()
export class ToolbarService {
  public color: Colors = Colors.Black;
  public brushSize: BrushSizes = BrushSizes.M;
  public tool: Tools = Tools.Pen;
}
