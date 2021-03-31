import { Inject, Injectable } from '@angular/core';
import * as nodeDebug from 'debug';
import { IDebugger } from 'debug';
import { CONFIGURATION, DebugModuleConfiguration } from './debug-module.configuration';

@Injectable()
export class DebugService {
  constructor(@Inject(CONFIGURATION) private readonly configuration: DebugModuleConfiguration) {}

  derive(namespace: string): IDebugger {
    return nodeDebug(`${this.configuration.baseNamespace}:${namespace}`);
  }
}
