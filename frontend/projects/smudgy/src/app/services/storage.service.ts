import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage: Storage = window.localStorage;

  get$<T>(key: string): Observable<T | undefined> {
    return defer(() => {
      const item = this.storage.getItem(key);

      if (item) {
        return of(JSON.parse(item) as T);
      }

      return of(undefined);
    });
  }

  set$<T>(key: string, value: T): Observable<void> {
    return defer(() => {
      this.storage.setItem(key, JSON.stringify(value));
      return of(undefined);
    });
  }

  delete$(key: string): Observable<void> {
    return defer(() => {
      this.storage.removeItem(key);
      return of(undefined);
    });
  }
}
