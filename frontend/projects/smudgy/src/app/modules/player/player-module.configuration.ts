import { InjectionToken } from '@angular/core';

export interface PlayerModuleConfiguration {
  startGameUrl: string;
}

export const CONFIGURATION = new InjectionToken<PlayerModuleConfiguration>('PlayerModuleConfiguration');
