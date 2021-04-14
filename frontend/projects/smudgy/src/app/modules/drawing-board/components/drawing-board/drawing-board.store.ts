import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { BrushSize } from '../../models/brush-size';
import { Color } from '../../models/color';
import { Observable } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, switchMap, tap, withLatestFrom } from 'rxjs/operators';
import { Tool } from '../../models/tool';
import { DrawCommand } from '../../models/draw-command';
import { Point } from '../../models/point';

export interface DrawingBoardState {
  brushSize: BrushSize;
  color: Color;
  tool: Tool;
  drawCommandPairs: [DrawCommand, DrawCommand][];
  isDrawing: boolean;
}

@Injectable()
export class DrawingBoardStore extends ComponentStore<DrawingBoardState> {
  readonly brushSize$ = this.select(state => state.brushSize);
  readonly color$ = this.select(state => state.color);
  readonly tool$ = this.select(state => state.tool);
  readonly drawCommandPairs$ = this.select(state => state.drawCommandPairs);
  readonly nextDrawCommandPair$ = this.drawCommandPairs$.pipe(
    map(pairs => pairs[pairs.length - 1]),
    filter(pair => !!pair),
  );
  readonly isDrawing$ = this.select(state => state.isDrawing);
  readonly drawStart$ = this.isDrawing$.pipe(filter(isDrawing => isDrawing));
  readonly drawStop$ = this.isDrawing$.pipe(filter(isDrawing => !isDrawing));

  readonly changeBrushSize = this.effect((brushSize$: Observable<BrushSize>) =>
    brushSize$.pipe(tap(brushSize => this.patchState({ brushSize }))),
  );
  readonly changeColor = this.effect((color$: Observable<Color>) => color$.pipe(tap(color => this.patchState({ color }))));
  readonly changeTool = this.effect((tool$: Observable<Tool>) => tool$.pipe(tap(tool => this.patchState({ tool }))));

  readonly startDrawing = this.effect((startDrawing$: Observable<void>) =>
    startDrawing$.pipe(tap(() => this.patchState({ isDrawing: true }))),
  );
  readonly stopDrawing = this.effect((stopDrawing$: Observable<void>) =>
    stopDrawing$.pipe(tap(() => this.patchState({ isDrawing: false }))),
  );
  readonly draw = this.effect((point$: Observable<Point>) =>
    this.drawStart$.pipe(
      switchMap(() =>
        point$.pipe(
          distinctUntilChanged((a, b) => a.x === b.x && a.y === b.y),
          withLatestFrom(this.tool$, this.brushSize$, this.color$),
          map(([point, tool, brushSize, color]): DrawCommand => ({ point, color, tool, brushSize })),
          pairwise(),
          tap(pair => this.appendDrawCommandPairToState(pair)),
        ),
      ),
    ),
  );

  readonly appendDrawCommandPair = this.effect((drawCommandPair$: Observable<[DrawCommand, DrawCommand]>) =>
    drawCommandPair$.pipe(tap(pair => this.appendDrawCommandPairToState(pair))),
  );

  constructor() {
    super({
      brushSize: BrushSize.M,
      color: Color.Black,
      tool: Tool.Pen,
      drawCommandPairs: [],
      isDrawing: false,
    });
  }

  private appendDrawCommandPairToState(pair: [DrawCommand, DrawCommand]): void {
    this.patchState(state => ({
      ...state,
      drawCommandPairs: [...state.drawCommandPairs, pair],
    }));
  }
}
