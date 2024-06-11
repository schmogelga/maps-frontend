import { AuthenticationService } from './../services/authentication.service';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class OperadorGuard implements CanActivate {
  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const userRoles = this.authService.userRoles();
    if (!userRoles || !(userRoles.includes('ADMIN') || userRoles.includes('OPERADOR'))) {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}