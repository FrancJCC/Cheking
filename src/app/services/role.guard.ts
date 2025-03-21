import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RolesService } from './roles.service';

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(
    private rolesService: RolesService,
    private router: Router
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const allowedRoles = route.data['roles'] as number[];
    console.log('Route attempted:', state.url);
    console.log('Allowed roles:', allowedRoles);
    
    if (!allowedRoles) {
      console.log('No roles specified for route');
      this.router.navigate(['/attendance']);
      return false;
    }

    if (this.rolesService.hasRole(allowedRoles)) {
      console.log('Access granted');
      return true;
    }

    console.log('Access denied');
    this.router.navigate(['/attendance']);
    return false;
  }
}