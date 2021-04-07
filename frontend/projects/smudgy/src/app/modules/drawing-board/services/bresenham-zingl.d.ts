declare module 'bresenham-zingl' {
  export function line(previousX: number, previousY: number, x: number, y: number, callback: (x: number, y: number) => void): void;
}
