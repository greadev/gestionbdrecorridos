import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
	  if (!this.auth.isLoggedIn()) {
		this.router.navigate(['/login']);
		return false;
	  }

	  // Si la ruta tiene restricción de roles:
	  const expectedRoles = route.data['roles'] as string[] | undefined;
	  const userRole = this.auth.getUserRole();
	  if (expectedRoles && (!userRole || !expectedRoles.includes(userRole))) {
		this.router.navigate(['/login']);
		return false;
	  }

	  return true;
	}

}
