import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of, timeout } from 'rxjs';
import { filter, map, switchMap, take, withLatestFrom } from 'rxjs/operators';
import { selectLoggedIn, selectPlayerId, selectPlayerName } from '../../player/state/player.selectors';
import { PlayerState } from '../../player/state/player.state';

@Injectable({ providedIn: 'root' })
export class HasPlayerGuard implements CanActivate {
  constructor(private readonly playerStore: Store<PlayerState>, private readonly router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    _state: RouterStateSnapshot,
  ): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.playerStore.select(selectLoggedIn).pipe(
      withLatestFrom(this.playerStore.select(selectPlayerName), this.playerStore.select(selectPlayerId)),
      take(1),
      switchMap(([isLoggedIn, playerName, playerId]) => {
        if (isLoggedIn) {
          return of(true);
        }

        // If we are not logged in yet, but we have a player id and a player name, then a login is possible, so we just wait for it a bit.
        if (!isLoggedIn && playerName && playerId) {
          return this.playerStore.select(selectLoggedIn).pipe(
            filter(loggedIn => loggedIn),
            timeout(2500), // TODO: make configurable
            map(() => true),
          );
        }

        return of(this.routeToHome(route.queryParamMap.get('sessionId')));
      }),
    );
  }

  private routeToHome(sessionId: string | null): UrlTree {
    return this.router.createUrlTree(['/'], { queryParams: { sessionId } });
  }
}
