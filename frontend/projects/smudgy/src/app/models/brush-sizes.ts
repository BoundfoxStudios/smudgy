export enum BrushSizes {
  S,
  M,
  L,
}

export function brushSizeToNumber(brushSize: BrushSizes): number {
  switch (brushSize) {
    case BrushSizes.S:
      return 2;
    case BrushSizes.M:
      return 8;
    case BrushSizes.L:
      return 16;
  }
}
