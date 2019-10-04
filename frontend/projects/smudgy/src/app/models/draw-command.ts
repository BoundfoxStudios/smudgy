import { BrushSizes } from './brush-sizes';
import { Colors } from './colors';
import { Point } from './point';
import { Tools } from './tools';

export interface DrawCommand {
  color: Colors;
  tool: Tools;
  brushSize: BrushSizes;
  point: Point;
}
