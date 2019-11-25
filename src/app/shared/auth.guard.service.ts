import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from './auth.service';


@Injectable()
export class AuthGuardService implements CanActivate {

    constructor(private router: Router,
        private authService: AuthService) { }

    canActivate(route: ActivatedRouteSnapshot): boolean {
        if (this.authService.authenticated) {
            return true;
        }
        this.router.navigate(['login']);
        return false;
    }
}