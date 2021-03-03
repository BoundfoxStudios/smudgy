import { ModuleWithProviders, NgModule } from '@angular/core';
import { CONFIGURATION, DebugModuleConfiguration } from './debug-module.configuration';
import { DebugService } from './debug.service';

@NgModule()
export class DebugModule {
  static forRoot(configuration: DebugModuleConfiguration): ModuleWithProviders<DebugModule> {
    return {
      ngModule: DebugModule,
      providers: [DebugService, { provide: CONFIGURATION, useValue: configuration }],
    };
  }
}
