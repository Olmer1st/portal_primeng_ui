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


    public get httpOptions(): RequestOptions {
        // let header = {};
        // header[this.config.settings.sessionId] = this.currentToken;
        let headers = new Headers();
        headers.append('Accept', 'application/json');
        headers.append('Content-Type', 'application/json');
        headers.append('X-Access-Token', this.currentToken);
        // headers.append('Authorization', `Bearer ${this.currentToken}`);
        let options = new RequestOptions({ headers: headers, withCredentials: false   });

        return options;
    }
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig) {
        //console.log(config.title);
        this.currentToken = localStorage.getItem(this.config.settings.sessionId);

        if (this.currentToken) {
            this.authenticate(this.currentToken)
                .subscribe(user => {
                    this.currentUser = user;
                }, //Bind to view
                err => {
                    // Log errors if any
                    console.log(err);
                    this.currentUser = null;
                    localStorage.removeItem(this.config.settings.sessionId);
                });
        }
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
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    login(userEmail: string, userPassword: string): void {
        this.authorization(userEmail, userPassword)
            .subscribe(user => {
                this.currentUser = user;
                localStorage.setItem(this.config.settings.sessionId, user.token);
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.currentUser = null;
            });
    }
    logout(): void {
        this.currentUser = null;
        localStorage.removeItem(this.config.settings.sessionId);
    }
}
