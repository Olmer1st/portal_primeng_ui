import { Injectable, Inject }     from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Author, Genre, Book, SearchQuery}  from './library.models';
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
export class LibraryService {
    // Resolve HTTP using the constructor
    constructor(private http: Http, @Inject(APP_CONFIG) private config: AppConfig, private _authService: AuthService) {
        //console.log(config.title);
    }
    //
    getAuthors(search: string): Observable<any> {
        const url = this.config.apiRootUrl + "library/authors/search/" + search;
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));

    }

    //     getAllSeries(lang: string, page: number): Observable<SeriesDataInfo> {
    //         const url = `${this.config.apiRootUrl}library/series/all/${page}/${lang}/40`;
    //         // ...using get request
    //         return this.http.get(url)
    //             // ...and calling .json() on the response to return data
    //             .map((res: Response) => res.json())
    //             //...errors if any
    //             .catch((error: any) => Observable.throw(error || 'Server error'));
    //
    //     }
    getLanguages(): Observable<string[]> {
        const url = this.config.apiRootUrl + "library/languages";
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    getSeries(search: string): Observable<string[]> {
        const url = this.config.apiRootUrl + "library/series/search/" + search;
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    getGenres(search: string = ""): Observable<Genre[]> {
        const url = this.config.apiRootUrl + `library/genres/search/${search}`;
        // ...using get request
        return this.http.get(url, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
    searchForBook(query: SearchQuery): Observable<Book[]> {
        const url = this.config.apiRootUrl + "library/books/search";
        // ...using get request
        return this.http.post(url, query, this._authService.httpOptions)
            // ...and calling .json() on the response to return data
            .map((res: Response) => res.json())
            //...errors if any
            .catch((error: any) => Observable.throw(error || 'Server error'));
    }
}
