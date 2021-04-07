import { Injectable } from '@angular/core';
import { BrushSize } from '../../../models/brush-size';
import { Color } from '../../../models/color';
import { Tool } from '../../../models/tool';

@Injectable()
export class ToolbarService {
  public color: Color = Color.Black;
  public brushSize: BrushSize = BrushSize.M;
  public tool: Tool = Tool.Pen;
}
