export enum Colors {
  White,
  Black,
  Yellow,
  Green,
  Red,
  Blue,
  Purple,
}

export function colorToCSSHex(color: Colors): string {
  switch (color) {
    case Colors.White:
      return '#ffffff';
    case Colors.Yellow:
      return '#ffff00';
    case Colors.Green:
      return '#00ff00';
    case Colors.Red:
      return '#ff0000';
    case Colors.Blue:
      return '#0000ff';
    case Colors.Purple:
      return '#ff00ed';
    case Colors.Black:
      return '#000000';
    default:
      return '#ffffff';
  }
}
