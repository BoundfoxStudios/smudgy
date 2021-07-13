import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private readonly storage: Storage = window.localStorage;

  get$<T>(key: string): Observable<T | undefined> {
    return defer(() => of(JSON.parse(this.storage.getItem(key)!) ?? undefined));
  }

  set$<T>(key: string, value: T): Observable<void> {
    return defer(() => of(this.storage.setItem(key, JSON.stringify(value))));
  }

  delete$(key: string): Observable<void> {
    return defer(() => of(this.storage.removeItem(key)));
  }
}
