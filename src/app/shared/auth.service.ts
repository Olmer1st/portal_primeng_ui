import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
    currentUser: User = null;
    httpHeaders: Headers = new Headers();
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
        //console.log(config.title);
        this.httpHeaders.append(this.config.settings.sessionId, "");
        let token = localStorage.getItem(this.config.settings.sessionId);

        if (token) {
            this.authorization(token)
                .subscribe(user => {
                    this.currentUser = user;
                    localStorage.setItem(this.config.settings.sessionId, user.token);
                    this.httpHeaders.set(this.config.settings.sessionId, user.token);
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
                    this.currentUser = null;
                    this.httpHeaders.set(this.config.settings.sessionId, "");
                });
        }
    }


    private authenticate(userEmail: string, userPassword: string): Observable<User> {
        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const url = this.config.apiRootUrl + `admin/login/${userEmail}/${userPassword}`;
        // ...using get request
        return this.http.get(url, { headers: this.httpHeaders })
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    private authorization(token: string): Observable<User> {
        // return Observable.of(true).delay(1000).do(val => this.isLoggedIn = true);
        const url = this.config.apiRootUrl + `admin/authenticate/${token}`;
        // ...using get request
        return this.http.get(url, { headers: this.httpHeaders })
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    login(userEmail: string, userPassword: string): void {
        this.authenticate(userEmail, userPassword)
            .subscribe(user => {
                this.currentUser = user;
                localStorage.setItem(this.config.settings.sessionId, JSON.stringify(user));
                this.httpHeaders.set(this.config.settings.sessionId, user.token);
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.currentUser = null;
                this.httpHeaders.set(this.config.settings.sessionId, "");
            });
    }
    logout(): void {
        this.currentUser = null;
        localStorage.removeItem(this.config.settings.sessionId);
        this.httpHeaders.set(this.config.settings.sessionId, "");
    }
}
