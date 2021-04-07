import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { CanvasRetinaDirective } from './directives/canvas-retina.directive';
import { MouseDirective } from './directives/mouse.directive';
import { DrawServiceProviderDirective } from './directives/draw-service-provider.directive';
import { BrushSelectorComponent } from './components/brush-selector/brush-selector.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { ToolSelectorComponent } from './components/tool-selector/tool-selector.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [
    DrawingBoardComponent,
    CanvasRetinaDirective,
    MouseDirective,
    DrawServiceProviderDirective,
    BrushSelectorComponent,
    ColorSelectorComponent,
    ToolSelectorComponent,
  ],
  imports: [CommonModule, FontAwesomeModule],
  exports: [DrawingBoardComponent],
})
export class DrawingBoardModule {}
