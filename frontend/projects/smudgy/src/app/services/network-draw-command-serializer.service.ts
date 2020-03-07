import { Injectable } from '@angular/core';
import { DrawCommand } from '../models/draw-command';

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
  serialize(drawCommands: DrawCommand[]): number[] {
    if (!drawCommands || !drawCommands.length) {
      return [];
    }

    const result: number[] = [];

    const [first, ...otherDrawCommands] = drawCommands;

    result.push(first.color, first.brushSize, first.tool, first.point.x, first.point.y);

    otherDrawCommands.forEach(command => result.push(command.point.x, command.point.y));

    return result;
  }

  deserialize(commandBuffer: number[]): DrawCommand[] {
    if (!commandBuffer || !commandBuffer.length) {
      return [];
    }

    if (commandBuffer.length < 5) {
      throw new Error('not a single draw command can be deserialized point the given command buffer');
    }

    const [color, brushSize, tool, x, y, ...otherCommandBuffer] = commandBuffer;

    const firstCommand: DrawCommand = {
      color,
      brushSize,
      tool,
      point: {
        x,
        y,
      },
    };

    const result: DrawCommand[] = [firstCommand];

    for (let i = 0; i < otherCommandBuffer.length; i = i + 2) {
      const previousCommand = result[result.length - 1];
      result.push({
        color: previousCommand.color,
        brushSize: previousCommand.brushSize,
        tool: previousCommand.tool,
        point: {
          x: otherCommandBuffer[i],
          y: otherCommandBuffer[i + 1],
        },
      });
    }

    return result;
  }
}
