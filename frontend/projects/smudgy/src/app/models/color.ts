export enum Color {
  White = 1,
  Black,
  Yellow,
  Green,
  Red,
  Blue,
  Purple,
}

export function colorToCSSHex(color: Color): string {
  switch (color) {
    case Color.White:
      return '#ffffff';
    case Color.Yellow:
      return '#ffff00';
    case Color.Green:
      return '#00ff00';
    case Color.Red:
      return '#ff0000';
    case Color.Blue:
      return '#0000ff';
    case Color.Purple:
      return '#ff00ed';
    case Color.Black:
      return '#000000';
    default:
      return '#ffffff';
  }
}
