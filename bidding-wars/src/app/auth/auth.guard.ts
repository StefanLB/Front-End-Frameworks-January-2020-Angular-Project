import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {

    return this.auth.getUserState().pipe(
      map(user => !!user === route.data.isLogged),
      take(1),
      tap(allowed => {
        if (!allowed && route.data.isLogged) {
          console.log(!allowed);
          console.log(route.data.isLogged === true);
          this.router.navigate(['/login']);
        } else if (!allowed && !route.data.isLogged) {
          this.router.navigate(['/bids']);
        }
      }));
  }
}
