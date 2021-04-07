import { ComponentStore } from '@ngrx/component-store';
import { Injectable } from '@angular/core';
import { BrushSize } from '../../../../models/brush-size';
import { Color } from '../../../../models/color';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Tool } from '../../../../models/tool';

export interface DrawingBoardState {
  brushSize: BrushSize;
  color: Color;
  tool: Tool;
}

@Injectable()
export class DrawingBoardStore extends ComponentStore<DrawingBoardState> {
  readonly changeBrushSize = this.effect((brushSize$: Observable<BrushSize>) =>
    brushSize$.pipe(tap(brushSize => this.patchState({ brushSize }))),
  );

  readonly changeColor = this.effect((color$: Observable<Color>) => color$.pipe(tap(color => this.patchState({ color }))));
  readonly changeTool = this.effect((tool$: Observable<Tool>) => tool$.pipe(tap(tool => this.patchState({ tool }))));

  readonly brushSize$ = this.select(state => state.brushSize);
  readonly color$ = this.select(state => state.color);
  readonly tool$ = this.select(state => state.tool);

  constructor() {
    super({
      brushSize: BrushSize.M,
      color: Color.Black,
      tool: Tool.Pen,
    });
  }
}
