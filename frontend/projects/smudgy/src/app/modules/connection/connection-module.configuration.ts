import { InjectionToken } from '@angular/core';

export interface ConnectionModuleConfiguration {
  url: string;
  reconnectRetryDelays?: number[];
}

export const CONFIGURATION = new InjectionToken<ConnectionModuleConfiguration>('Connection Module Configuration');
