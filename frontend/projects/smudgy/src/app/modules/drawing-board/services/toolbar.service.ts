import { Injectable } from '@angular/core';
import { BrushSize } from '../models/brush-size';
import { Color } from '../models/color';
import { Tool } from '../models/tool';

@Injectable()
export class ToolbarService {
  color: Color = Color.Black;
  brushSize: BrushSize = BrushSize.M;
  tool: Tool = Tool.Pen;
}
