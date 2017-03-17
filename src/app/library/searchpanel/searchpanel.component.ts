import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {LibraryService} from '../library.service';
import { Author, Genre, Book}  from '../library.models';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "searchpanel",
    templateUrl: "searchpanel.component.html",
    styleUrls: ['searchpanel.component.css']
})
export class SearchPanelComponent implements OnInit {
    private _copyDefaultSearchQuery = null;
    public searchQuery = {
        bookTitle: null,
        operator: true,
        author: null,
        genres: null,
        serie: null,
        language: "ru"
    };
    // selectedLanguage: string = "ru";
    languages: SelectItem[] = [];
    authors: Author[];
    genres: Genre[];
    series:string[];
    @Output() onTogglePanelClicked = new EventEmitter();
    constructor(private _libraryService: LibraryService) {
        this._copyDefaultSearchQuery = JSON.parse(JSON.stringify(this.searchQuery));
    }
    selectLanguage(choice: string): void {
        this.searchQuery.language = choice;
    }
    searchGenre(event) {
        let query = event.query;
        this._libraryService.getGenres(query).subscribe(genres => {
            this.genres = genres;
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    searchSeries(event) {
        let query = event.query;
        this._libraryService.getSeries(query).subscribe(series => {
            this.series = series;
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    searchAuthors(event) {
        let query = event.query;
        this._libraryService.getAuthors(query ? query.toLowerCase() : "").subscribe(authorsObj => {
            this.authors = Object.keys(authorsObj).map(key => { return { 'key': key, 'display': authorsObj[key] }; });
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    private loadLanguages(): void {
        this._libraryService.getLanguages()
            .subscribe(langs => this.languages = langs.map((l) => { return { label: l, value: l }; }), //Bind to view
            err => {
                // Log errors if any
                console.log(err);
            });
    }
    ngOnInit(): void {
        this.loadLanguages();
    }
    search() {
        this.onTogglePanelClicked.emit();
    }

    clear() {
        this.searchQuery = JSON.parse(JSON.stringify(this._copyDefaultSearchQuery));
    }


}
