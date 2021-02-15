import { InjectionToken } from '@angular/core';
import { concat, Observable } from 'rxjs';
import { mapTo } from 'rxjs/operators';

export interface Initializable {
  initialize$(): Observable<void>;
}

export function implementsInitializable(input: any): input is Initializable {
  return !!(input as Initializable).initialize$;
}

export const INITIALIZABLE = new InjectionToken<Initializable>('service to initialize');

export function initializableInitializerFactory(initializables: Initializable[]): () => Promise<boolean> {
  return () =>
    concat(...initializables.filter(implementsInitializable).map(i => i.initialize$()))
      .pipe(mapTo(true))
      .toPromise();
}

export const initializableInitializerFactoryDeps = [INITIALIZABLE];
