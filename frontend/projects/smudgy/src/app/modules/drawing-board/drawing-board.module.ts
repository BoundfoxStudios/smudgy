import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrushSelectorComponent } from './components/brush-selector/brush-selector.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { ToolSelectorComponent } from './components/tool-selector/tool-selector.component';
import { CanvasRetinaDirective } from './directives/canvas-retina.directive';
import { MouseDirective } from './directives/mouse.directive';

@NgModule({
  declarations: [
    DrawingBoardComponent,
    CanvasRetinaDirective,
    MouseDirective,
    BrushSelectorComponent,
    ColorSelectorComponent,
    ToolSelectorComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [DrawingBoardComponent],
})
export class DrawingBoardModule {}
