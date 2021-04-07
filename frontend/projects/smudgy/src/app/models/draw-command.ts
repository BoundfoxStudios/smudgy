import { BrushSize } from './brush-size';
import { Color } from './color';
import { Point } from './point';
import { Tool } from './tool';

export interface DrawCommand {
  color: Color;
  tool: Tool;
  brushSize: BrushSize;
  point: Point;
}
