import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEraser, faFillDrip, faPen } from '@fortawesome/free-solid-svg-icons';

export enum Tool {
  Pen = 1,
  Eraser,
  Fill,
}

export function toolToIcon(tool: Tool): IconDefinition {
  switch (tool) {
    case Tool.Eraser:
      return faEraser;

    case Tool.Fill:
      return faFillDrip;

    case Tool.Pen:
    default:
      return faPen;
  }
}
