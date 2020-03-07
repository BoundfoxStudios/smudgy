import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

export abstract class AbstractDestroyable implements OnDestroy {
  private readonly destroySubject = new Subject<void>();

  readonly destroy$ = this.destroySubject.asObservable();

  ngOnDestroy(): void {
    this.destroySubject.next();
    this.destroySubject.complete();
  }
}
