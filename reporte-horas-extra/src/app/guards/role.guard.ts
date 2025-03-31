import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/'], { 
        queryParams: { returnUrl: state.url },
        replaceUrl: true
      });
      return false;
    }

    const requiredRoles = route.data['roles'] as number[];
    const userRole = this.authService.getRole();

    if (!requiredRoles || requiredRoles.length === 0) return true;

    if (requiredRoles.includes(userRole!)) {
      return true;
    }

    this.router.navigate(['/'], { 
      queryParams: { unauthorized: true },
      replaceUrl: true
    });
    return false;
  }
}
