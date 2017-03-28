import { Injectable }       from '@angular/core';
import {
    CanLoad, Route,
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    NavigationExtras
}                           from '@angular/router';
import { AuthService }      from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        let url: string = state.url;

        return this.checkLogin(url);
    }

    canLoad(route: Route): boolean {
        let url = `/${route.path}`;

        return this.checkLogin(url);
    }

    checkLogin(url: string): boolean {
        if (this.authService.currentUser) { return true; }


        // Create a dummy session id
        let sessionId = 123456789;

        // Set our navigation extras object
        // that contains our global query params and fragment
        let navigationExtras: NavigationExtras = {
            queryParams: { 'session_id': sessionId },
            fragment: 'anchor'
        };

        // Navigate to the login page with extras
        // this.router.navigate(['/login'], navigationExtras);
        return false;
    }
}
