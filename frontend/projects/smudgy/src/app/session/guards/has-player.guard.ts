import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { map, take, withLatestFrom } from 'rxjs/operators';
import { selectLoggedIn, selectPlayerName } from '../../player/state/player.selectors';
import { PlayerState } from '../../player/state/player.state';

@Injectable({ providedIn: 'root' })
export class HasPlayerGuard implements CanActivate {
  constructor(private readonly playerStore: Store<PlayerState>, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.playerStore.select(selectLoggedIn).pipe(
      withLatestFrom(this.playerStore.select(selectPlayerName)),
      take(1),
      map(([isLoggedIn, playerName]) => {
        if (!isLoggedIn && !playerName) {
          return this.routeToHome(route.queryParamMap.get('sessionId'));
        }

        return true;
      }),
    );
  }

  private routeToHome(sessionId: string | null): UrlTree {
    return this.router.createUrlTree(['/'], { queryParams: { sessionId } });
  }
}
