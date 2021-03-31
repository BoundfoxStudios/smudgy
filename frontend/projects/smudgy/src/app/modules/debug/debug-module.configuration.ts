import { InjectionToken } from '@angular/core';

export interface DebugModuleConfiguration {
  baseNamespace: string;
}

export const CONFIGURATION = new InjectionToken<DebugModuleConfiguration>('DebugModuleConfiguration');
