import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../portal/portal.providers';
import {Observable} from 'rxjs/Rx';
import {User} from './shared.models';
//
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//


@Injectable()
export class AuthService {
    public currentUser: User = null;
    private currentToken: string = null;
    public isAuthenticated: boolean = false;
    public isAuthorizedToSee(moduleName: string, roles: string[] = []): boolean {
        if (this.currentUser) {
            if (roles.length) {
                if (roles.includes(this.currentUser.role)) {
                    return this.currentUser.modules.includes(moduleName) || this.currentUser.role === 'admin';
                } else {
                    return false;
                }
            }
            return this.currentUser.modules.includes(moduleName) || this.currentUser.role === 'admin';
        }
        return false;
    }
    public get httpOptions(): RequestOptions {
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Access-Token', this.currentToken);
        let options = new RequestOptions({ headers: headers, withCredentials: false });

        return options;
    }
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
        this.makeAuthenticated().subscribe(res => this.isAuthenticated = res, err => {
            // Log errors if any
            console.log(err);
        });
    }

    makeAuthenticated(): Observable<boolean> {
        this.currentToken = localStorage.getItem(this.config.settings.sessionId);
        return this.authenticate(this.currentToken)
            .map(user => {
                if (user) {
                    this.isAuthenticated = true;
                    this.currentUser = user;
                    return true;
                }
                this.isAuthenticated = false;
                this.currentUser = null;
                localStorage.removeItem(this.config.settings.sessionId);
                return false;
            })
            .first();
    }
    private authorization(userEmail: string, userPassword: string): Observable<User> {
        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const url = this.config.apiRootUrl + `public/login/${userEmail}/${userPassword}`;
        // ...using get request
        return this.http.get(url)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    private authenticate(token: string): Observable<User> {
        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const url = this.config.apiRootUrl + `public/authenticate`;
        // ...using get request
        return this.http.post(url, { token: token })
            // ...and calling .json() on the response to return data
            .map((res: Response) => {
                return res.json();
            })
            //...errors if any
            .catch((error: any) => {
                return Observable.throw(error || 'Server error');
            });
    }
    login(userEmail: string, userPassword: string): void {
        this.authorization(userEmail, userPassword)
            .subscribe(user => {
                this.currentUser = user;
                localStorage.setItem(this.config.settings.sessionId, user.token);
                this.currentToken = user.token;
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.currentUser = null;
                this.currentToken = null;
                localStorage.removeItem(this.config.settings.sessionId);
            });
    }
    logout(): void {
        this.currentUser = null;
        this.currentToken = null;
        localStorage.removeItem(this.config.settings.sessionId);
    }
}
