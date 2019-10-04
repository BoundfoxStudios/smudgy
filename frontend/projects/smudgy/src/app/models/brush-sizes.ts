export enum BrushSizes {
  XS,
  S,
  M,
  L,
  XL
}

export function brushSizeToNumber(brushSize: BrushSizes): number {
  switch (brushSize) {
    case BrushSizes.XS:
      return 2;
    case BrushSizes.S:
      return 6;
    case BrushSizes.M:
      return 12;
    case BrushSizes.L:
      return 18;
    case BrushSizes.XL:
      return 24;
  }
}
