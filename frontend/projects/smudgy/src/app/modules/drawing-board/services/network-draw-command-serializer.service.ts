import { Injectable } from '@angular/core';
import { DrawCommand } from '../../../models/draw-command';

/**
 * Per game play mechanic, within a draw command array, there can only be one tool,
 * changing the tool means a complete new draw command array.
 * With that definition, we simply can strip out all color and tool information except the first one.
 * And vice versa for deserializing.
 */
@Injectable({
  providedIn: 'root',
})
export class NetworkDrawCommandSerializerService {
  serialize(drawCommands: [DrawCommand, DrawCommand][]): number[] {
    if (!drawCommands || !drawCommands.length) {
      return [];
    }

    const result: number[] = [];

    const flat = ([] as DrawCommand[]).concat(...drawCommands);

    const [first, ...otherDrawCommands] = flat;

    result.push(first.color, first.brushSize, first.tool, first.point.x, first.point.y);

    otherDrawCommands.forEach(command => result.push(command.point.x, command.point.y));

    return result;
  }

  deserialize(commandBuffer: number[]): [DrawCommand, DrawCommand][] {
    if (!commandBuffer || !commandBuffer.length) {
      return [];
    }

    if (commandBuffer.length < 7) {
      throw new Error('not a single draw command can be deserialized point the given command buffer');
    }

    const [color, brushSize, tool, ...pointBuffer] = commandBuffer;

    const result: [DrawCommand, DrawCommand][] = [];

    for (let i = 0; i < pointBuffer.length; i = i + 4) {
      const previousCommand: DrawCommand = {
        color,
        brushSize,
        tool,
        point: {
          x: pointBuffer[i],
          y: pointBuffer[i + 1],
        },
      };

      const nextCommand: DrawCommand = {
        color,
        brushSize,
        tool,
        point: {
          x: pointBuffer[i + 2],
          y: pointBuffer[i + 3],
        },
      };

      result.push([previousCommand, nextCommand]);
    }

    return result;
  }
}
