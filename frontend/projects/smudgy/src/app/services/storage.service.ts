import { Injectable } from '@angular/core';
import { defer, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private storage: Storage = window.sessionStorage;

  get$<T>(key: string): Observable<T> {
    return defer(() => of(JSON.parse(this.storage.getItem(key))));
  }

  set$<T>(key: string, value: T): Observable<void> {
    return defer(() => this.storage.setItem(key, JSON.stringify(value)));
  }

  delete$(key: string): Observable<void> {
    return defer(() => this.storage.removeItem(key));
  }
}
