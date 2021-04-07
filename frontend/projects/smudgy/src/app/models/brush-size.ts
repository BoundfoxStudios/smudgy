export enum BrushSize {
  S = 1,
  M,
  L,
}

export function brushSizeToNumber(brushSize: BrushSize): number {
  switch (brushSize) {
    case BrushSize.S:
      return 2;
    case BrushSize.M:
      return 8;
    case BrushSize.L:
      return 16;
  }
}
