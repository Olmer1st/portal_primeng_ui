import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { IUser, IModule, IActiveUser}  from '../shared/shared.models';
import { APP_CONFIG, AppConfig } from '../portal/portal.providers';
import {AuthService} from '../shared/auth.service';
import {Observable} from 'rxjs/Rx';
//
//
// Import RxJs required methods
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
//
@Injectable()
export class AdminService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private _authService: AuthService) {
        //console.log(config.title);
    }

    getUsers(): Observable<IUser[]> {
        const url = this.config.apiRootUrl + "admin/users";
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }
    getModules(): Observable<IModule[]> {
        const url = this.config.apiRootUrl + "admin/modules";
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }
    getActiveUsers(): Observable<IActiveUser[]> {
        const url = this.config.apiRootUrl + "admin/activeusers";
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    deleteUser(uid: string): Observable<any> {
        const url = this.config.apiRootUrl + "admin/users/" + uid;
        // ...using get request
        return this.http.delete(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    lockUser(uid: string, lock: number): Observable<any> {
        const url = this.config.apiRootUrl + `admin/users/${uid}/${lock}`;
        // ...using get request
        return this.http.put(url, {}, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    modifyModule(me: IModule): Observable<IModule> {
        const url = this.config.apiRootUrl + "admin/modules";
        // ...using get request
        return this.http.post(url, { module: me }, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    modifyUser(user: IUser): Observable<IUser> {
        const url = this.config.apiRootUrl + "admin/users";
        // ...using get request
        return this.http.post(url, { user: user }, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    deleteModule(mid: string): Observable<any> {
        const url = this.config.apiRootUrl + "admin/modules/" + mid;
        // ...using get request
        return this.http.delete(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    // downloadBook(book: Book): Observable<any> {
    //     const fileName: string = `${book.file}.${book.ext}.zip`;
    //     const url = this.config.apiRootUrl + `library/books/download`;
    //     // ...using get request
    //     return this.http.post(url, { "folderName": book.path, "fileName": fileName}, this._authService.httpDownloadOptions)
    //         // ...and calling .json() on the response to return data
    //         .map((res: Response) => res)
    //         //...errors if any
    //         .catch((error: any) => Observable.throw(error || 'Server error'));
    //
    // }
    //
    // downloadBooks(books: Book[] = [], fileName = ""): Observable<any> {
    //     const url = this.config.apiRootUrl + `library/books/download`;
    //     let paths = books.map(book => {
    //         return `/${book.path}/${book.file}.${book.ext}.zip`;
    //     });
    //
    //     // ...using get request
    //     return this.http.post(url, {
    //         "bookPaths": paths,
    //         "count": books.length,
    //         "fileName": fileName
    //     }, this._authService.httpDownloadOptions)
    //         // ...and calling .json() on the response to return data
    //         .map((res: Response) => res)
    //         //...errors if any
    //         .catch((error: any) => Observable.throw(error || 'Server error'));
    //
    // }
    // //     getAllSeries(lang: string, page: number): Observable<SeriesDataInfo> {
    // //         const url = `${this.config.apiRootUrl}library/series/all/${page}/${lang}/40`;
    // //         // ...using get request
    // //         return this.http.get(url)
    // //             // ...and calling .json() on the response to return data
    // //             .map((res: Response) => res.json())
    // //             //...errors if any
    // //             .catch((error: any) => Observable.throw(error || 'Server error'));
    // //
    // //     }
    // getLanguages(): Observable<string[]> {
    //     const url = this.config.apiRootUrl + "library/languages";
    //     // ...using get request
    //     return this.http.get(url, this._authService.httpOptions)
    //         // ...and calling .json() on the response to return data
    //         .map((res: Response) => res.json())
    //         //...errors if any
    //         .catch((error: any) => Observable.throw(error || 'Server error'));
    // }
    // getSeries(search: string): Observable<string[]> {
    //     const url = this.config.apiRootUrl + "library/series/search/" + search;
    //     // ...using get request
    //     return this.http.get(url, this._authService.httpOptions)
    //         // ...and calling .json() on the response to return data
    //         .map((res: Response) => res.json())
    //         //...errors if any
    //         .catch((error: any) => Observable.throw(error || 'Server error'));
    // }
    // getGenres(search: string = ""): Observable<Genre[]> {
    //     const url = this.config.apiRootUrl + `library/genres/search/${search}`;
    //     // ...using get request
    //     return this.http.get(url, this._authService.httpOptions)
    //         // ...and calling .json() on the response to return data
    //         .map((res: Response) => res.json())
    //         //...errors if any
    //         .catch((error: any) => Observable.throw(error || 'Server error'));
    // }
    // searchForBook(query: SearchQuery): Observable<Book[]> {
    //     const url = this.config.apiRootUrl + "library/books/search";
    //     // ...using get request
    //     return this.http.post(url, query, this._authService.httpOptions)
    //         // ...and calling .json() on the response to return data
    //         .map((res: Response) => res.json())
    //         //...errors if any
    //         .catch((error: any) => Observable.throw(error || 'Server error'));
    // }
}
