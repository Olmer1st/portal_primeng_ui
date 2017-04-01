import { Injectable }       from '@angular/core';
import {
    CanLoad, Route,
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
}                           from '@angular/router';
import { AuthService }      from './auth.service';
import {Observable} from 'rxjs/Rx';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
        let url: string = state.url.replace("/", "");
        // console.log(route.data, url);
        if (this.authService.isAuthenticated) {
            return this.checkLogin(url, (route.data) ? route.data.roles : []);
        } else {
            return this.authService.makeAuthenticated().map(res => {
                if (res) {
                    return this.checkLogin(url, (route.data) ? route.data.roles : []);
                }
                return false;
            });
        }

    }

    // canLoad(route: Route): Observable<boolean> | boolean {
    //     let url = `${route.path}`;
    //     if (this.authService.isAuthenticated) {
    //         return this.checkLogin(url, (route.data) ? route.data.roles : []);
    //     } else {
    //         return this.authService.makeAuthenticated().map(res => {
    //             if (res) {
    //                 return this.checkLogin(url, (route.data) ? route.data.roles : []);
    //             }
    //             return false;
    //         });
    //     }
    // }

    private checkLogin(url: string, roles: string[] = []): boolean {
        return this.authService.isAuthorizedToSee(url, roles);
    }
}
