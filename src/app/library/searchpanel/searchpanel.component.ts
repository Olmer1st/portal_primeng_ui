import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import {LibraryService} from '../library.service';
import { Author, Genre, Book, SearchQuery}  from '../library.models';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "searchpanel",
    templateUrl: "searchpanel.component.html",
    styleUrls: ['searchpanel.component.css']
})
export class SearchPanelComponent implements OnInit {
    private _copyDefaultSearchQuery = null;
    public searchQuery: SearchQuery = {
        bookTitle: null,
        operator: true,
        author: null,
        genres: null,
        serie: null,
        language: "ru"
    };
    @Input()
    languages: SelectItem[] = [];
    authors: Author[];
    @Input()
    genres: Genre[] = [];
    filteredGenres: Genre[] = [];
    series: string[];
    // books: Book[];
    @Output() onTogglePanelClicked = new EventEmitter();
    @Output() onStartSearch = new EventEmitter<SearchQuery>();
    constructor(private _libraryService: LibraryService) {
        this._copyDefaultSearchQuery = JSON.parse(JSON.stringify(this.searchQuery));
    }
    selectLanguage(choice: string): void {
        this.searchQuery.language = choice;
    }

    get isCannotSelectGenry() {
        return !this.searchQuery.bookTitle && !this.searchQuery.author && !this.searchQuery.serie;
    }
    searchGenre(event) {
        let query = event.query;
        if (!this.genres || !this.genres.length) {
            this._libraryService.getGenres(query).subscribe(genres => {
                this.filteredGenres = genres;
            }, err => {
                // Log errors if any
                console.log(err);
            });
        } else {
            this.filteredGenres = this.genres.filter(g => g.gdesc.includes(query));
        }

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

    ngOnInit(): void {

    }
    search() {
        this.onStartSearch.emit(this.searchQuery);
        this.onTogglePanelClicked.emit();
    }

    clear() {
        this.searchQuery = JSON.parse(JSON.stringify(this._copyDefaultSearchQuery));
    }


}
