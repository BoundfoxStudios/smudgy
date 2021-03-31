import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { CanvasRetinaDirective } from './directives/canvas-retina.directive';
import { MouseDirective } from './directives/mouse.directive';
import { DrawServiceProviderDirective } from './directives/draw-service-provider.directive';

@NgModule({
  declarations: [DrawingBoardComponent, CanvasRetinaDirective, MouseDirective, DrawServiceProviderDirective],
  imports: [CommonModule],
  exports: [DrawingBoardComponent],
})
export class DrawingBoardModule {}
