import { BrushSizes } from '../models/brush-sizes';
import { Colors } from '../models/colors';
import { DrawCommand } from '../models/draw-command';
import { Tools } from '../models/tools';
import { NetworkDrawCommandSerializerService } from './network-draw-command-serializer.service';

function createDrawCommand(color: Colors, brushSize: BrushSizes, tool: Tools, x: number, y: number)
  : DrawCommand {
  return {
    color,
    brushSize,
    tool,
    point: {
      x,
      y,
    },
  };
}

describe('DrawCommandSerializerService', () => {
  let sut: NetworkDrawCommandSerializerService;

  beforeEach(() => {
    sut = new NetworkDrawCommandSerializerService();
  });

  describe('serialize', () => {
    it('serializes an empty array', () => {
      expect(sut.serialize([])).toEqual([]);
    });

    it('serializes an array with a single entry', () => {
      expect(sut.serialize([createDrawCommand(Colors.Black, BrushSizes.XL, Tools.Fill, 1, 2)]))
        .toEqual([Colors.Black, BrushSizes.XL, Tools.Fill, 1, 2]);
    });

    it('serializes an array with multiple entries', () => {
      expect(sut.serialize([
        createDrawCommand(Colors.Black, BrushSizes.XL, Tools.Eraser, 1, 2),
        createDrawCommand(Colors.Black, BrushSizes.XL, Tools.Eraser, 3, 4),
        createDrawCommand(Colors.Black, BrushSizes.XL, Tools.Eraser, 5, 6),
      ])).toEqual([Colors.Black, BrushSizes.XL, Tools.Eraser, 1, 2, 3, 4, 5, 6]);
    });
  });

  describe('deserialze', () => {
    it('deserializes an empty array', () => {
      expect(sut.deserialize([])).toEqual([]);
    });

    it('throws when the array does not contain the amount of items to construct a single draw command', () => {
      const action = () => sut.deserialize([1, 2, 3, 4]); // needs 5
      expect(action).toThrow();
    });

    it('deserializes an array with a single draw command', () => {
      expect(sut.deserialize([Colors.White, BrushSizes.XL, Tools.Pen, 1, 2])).toEqual([
        createDrawCommand(Colors.White, BrushSizes.XL, Tools.Pen, 1, 2),
      ]);
    });

    it('deserializes an array with multiple draw commands', () => {
      expect(sut.deserialize([Colors.Black, BrushSizes.L, Tools.Eraser, 1, 2, 3, 4, 5, 6])).toEqual([
        createDrawCommand(Colors.Black, BrushSizes.L, Tools.Eraser, 1, 2),
        createDrawCommand(Colors.Black, BrushSizes.L, Tools.Eraser, 3, 4),
        createDrawCommand(Colors.Black, BrushSizes.L, Tools.Eraser, 5, 6),
      ]);
    });
  });
});
