import { BrushSize } from '../models/brush-size';
import { Color } from '../models/color';
import { DrawCommand } from '../models/draw-command';
import { Tool } from '../models/tool';
import { NetworkDrawCommandSerializerService } from './network-draw-command-serializer.service';

function createDrawCommand(color: Color, brushSize: BrushSize, tool: Tool, x: number, y: number): DrawCommand {
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
      const previousCommand = createDrawCommand(Color.Black, BrushSize.L, Tool.Fill, 1, 2);
      const nextCommand = createDrawCommand(Color.Black, BrushSize.L, Tool.Fill, 2, 3);

      expect(sut.serialize([[previousCommand, nextCommand]])).toEqual([Color.Black, BrushSize.L, Tool.Fill, 1, 2, 2, 3]);
    });

    it('serializes an array with multiple entries', () => {
      expect(
        sut.serialize([
          [createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 1, 2), createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 3, 4)],
          [createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 3, 4), createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 5, 6)],
          [createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 5, 6), createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 7, 8)],
        ]),
      ).toEqual([Color.Black, BrushSize.L, Tool.Eraser, 1, 2, 3, 4, 3, 4, 5, 6, 5, 6, 7, 8]);
    });
  });

  describe('deserialze', () => {
    it('deserializes an empty array', () => {
      expect(sut.deserialize([])).toEqual([]);
    });

    it('throws when the array does not contain the amount of items to construct a single draw command', () => {
      const action = () => sut.deserialize([1, 2, 3, 4, 5, 6]); // needs 7
      expect(action).toThrow();
    });

    it('deserializes an array with a single draw command', () => {
      expect(sut.deserialize([Color.White, BrushSize.L, Tool.Pen, 1, 2, 3, 5])).toEqual([
        [createDrawCommand(Color.White, BrushSize.L, Tool.Pen, 1, 2), createDrawCommand(Color.White, BrushSize.L, Tool.Pen, 3, 5)],
      ]);
    });

    it('deserializes an array with multiple draw commands', () => {
      expect(sut.deserialize([Color.Black, BrushSize.L, Tool.Eraser, 1, 2, 3, 4, 3, 4, 5, 6, 5, 6, 7, 8])).toEqual([
        [createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 1, 2), createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 3, 4)],
        [createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 3, 4), createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 5, 6)],
        [createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 5, 6), createDrawCommand(Color.Black, BrushSize.L, Tool.Eraser, 7, 8)],
      ]);
    });
  });
});
