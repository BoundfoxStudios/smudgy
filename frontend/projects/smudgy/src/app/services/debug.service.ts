import { Injectable } from '@angular/core';
import * as nodeDebug from 'debug';
import { IDebugger } from 'debug';

@Injectable({
  providedIn: 'root',
})
export class DebugService {
  derive(namespace: string): IDebugger {
    return nodeDebug(`smudgy:${namespace}`);
  }
}
