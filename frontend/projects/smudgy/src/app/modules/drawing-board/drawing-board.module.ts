import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SOCKET_SERVICE } from '../connection/services/socket.service';
import { BrushSelectorComponent } from './components/brush-selector/brush-selector.component';
import { ColorSelectorComponent } from './components/color-selector/color-selector.component';
import { DrawingBoardComponent } from './components/drawing-board/drawing-board.component';
import { ToolSelectorComponent } from './components/tool-selector/tool-selector.component';
import { CanvasRetinaDirective } from './directives/canvas-retina.directive';
import { MouseDirective } from './directives/mouse.directive';
import { DrawingBoardSocketService } from './services/drawing-board-socket.service';

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
export class DrawingBoardModule {
  static forRoot(): ModuleWithProviders<DrawingBoardModule> {
    return {
      ngModule: DrawingBoardModule,
      providers: [DrawingBoardSocketService, { provide: SOCKET_SERVICE, useExisting: DrawingBoardSocketService, multi: true }],
    };
  }
}
