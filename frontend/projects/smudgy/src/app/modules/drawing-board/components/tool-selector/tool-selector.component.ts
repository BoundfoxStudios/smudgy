import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { Tool, toolToIcon } from '../../models/tool';

interface ViewModel {
  tool: Tool;
  icon: IconDefinition;
}

@Component({
  selector: 'app-tool-selector',
  templateUrl: './tool-selector.component.html',
  styleUrls: ['./tool-selector.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToolSelectorComponent {
  @Input() activeTool = Tool.Pen;

  @Output() toolChange = new EventEmitter<Tool>();

  readonly tools: ViewModel[] = Object.keys(Tool)
    .filter((key: string | number): key is string => isNaN(Number(key)))
    .map((key: any) => (Tool[key] as unknown) as Tool)
    .map(tool => ({ tool, icon: toolToIcon(tool) }));
}
