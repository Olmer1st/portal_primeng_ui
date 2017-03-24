import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import {LibraryService} from './library.service';
import { Author, Genre, Book, SearchQuery}  from './library.models';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: "library",
    templateUrl: "library.component.html",
    styleUrls: ['library.component.css']
})
export class LibraryComponent {
    private _topBarOpened: boolean = true;
    books: Book[];
    loadingData:boolean = false;
    constructor(private _libraryService: LibraryService) {
    }
    onTogglePanelClicked() {
        this._topBarOpened = !this._topBarOpened;
    }
    onStartSearch(query: SearchQuery) {
        this.loadingData = true;
        this.books = [];
        this._libraryService.searchForBook(query)
            .subscribe(books => {
                this.books = books.map(book => {
                    let author = (book.author.lastIndexOf(":") > -1) ? book.author.substring(0, book.author.length - 1) : book.author;
                    book.author = author.replace(/,/g, " ").replace(/:/g, ", ");
                    // books
                    book.series = (book.series) ? book.series.trim() : "";
                    let genre = (book.genre.lastIndexOf(":") > -1) ? book.genre.substring(0, book.genre.length - 1) : book.genre;
                    book.genre = genre.replace(/:/g, ", ");
                    return book;
                });
                this.loadingData = false;
                // console.log(this.books);
            }, //Bind to view
            err => {
                // Log errors if any
                console.log(err);
                this.loadingData = false;
            });
    }
    private _toggleSearchPanel() {
        this._topBarOpened = !this._topBarOpened;
    }

    public NumbersSort(event) {
        // console.log(event);
        this.books.sort((b1, b2) => {
            if (!b1[event.field] && !b2[event.field]) {
                return 0;
            } else if (!b1[event.field] && b2[event.field]) {
                return event.order * -1;
            } else if (b1[event.field] && !b2[event.field]) {
                return event.order * 1;
            }
            return event.order * (b1[event.field] - b2[event.field]);
        });
        //event.field = Field to sort
        //event.order = Sort order
    }
    public DateSort(event) {
        // console.log(event);
        this.books.sort((b1, b2) => {
            return event.order * ((new Date(b1[event.field])).getTime() - (new Date(b2[event.field])).getTime());
        });
        //event.field = Field to sort
        //event.order = Sort order
    }
}
