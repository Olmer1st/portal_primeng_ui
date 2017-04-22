import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions, RequestMethod, ResponseContentType } from '@angular/http';
import { APP_CONFIG, AppConfig } from '../portal/portal.providers';
import {Observable} from 'rxjs/Rx';
import {IUser} from './shared.models';
//
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//


@Injectable()
export class AuthService {
    public currentUser: IUser = null;
    private currentToken: string = null;
    public isAuthenticated: boolean = false;
    public isAuthorizedToSee(moduleName: string, roles: string[] = []): boolean {
        if (this.currentUser && this.currentUser.modules && this.currentUser.locked.toString() === "0") {
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
    public get httpDownloadOptions(): RequestOptions {
        let headers = new Headers();
        headers.append('Accept', 'application/zip');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Access-Token', this.currentToken);
        let options = new RequestOptions({ headers: headers, withCredentials: false, responseType: ResponseContentType.Blob });

        return options;
    }
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
        this.makeAuthenticated().subscribe(res => {
            this.isAuthenticated = res;
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }

    makeAuthenticated(): Observable<boolean> {
        this.currentToken = localStorage.getItem(this.config.settings.sessionId);
        if (!this.currentToken) {
            return Observable.empty<boolean>();
        }
        return this.authenticate(this.currentToken)
            .map(user => {
                if (user && !user.error) {
                    this.isAuthenticated = true;
                    this.currentUser = user;
                    return true;
                } else {
                    console.error(user);
                }
                this.isAuthenticated = false;
                this.currentUser = null;
                localStorage.removeItem(this.config.settings.sessionId);
                return false;
            })
            .first();
    }
    private authorization(userEmail: string, userPassword: string): Observable<IUser> {
        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const url = this.config.apiRootUrl + `public/login`;
        // ...using get request
        return this.http.post(url, { email: userEmail, password: userPassword })
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    private authenticate(token: string): Observable<IUser> {
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
    login(userEmail: string, userPassword: string, cbFn = null): void {
        this.authorization(userEmail, userPassword)
            .subscribe(user => {
                if (user && !user.error) {
                    this.currentUser = user;
                    localStorage.setItem(this.config.settings.sessionId, user.token);
                    this.currentToken = user.token;
                }
                if (cbFn) {
                    cbFn(user);
                }
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
