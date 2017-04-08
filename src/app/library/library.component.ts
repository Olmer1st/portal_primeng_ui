import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import {LibraryService} from './library.service';
import { Author, Genre, Book, SearchQuery}  from './library.models';
import { Observable } from 'rxjs/Observable';
import {SelectItem} from 'primeng/primeng';
import { Response } from '@angular/http';
import * as saveAs from "file-saver";

@Component({
    moduleId: module.id,
    selector: "library",
    templateUrl: "library.component.html",
    styleUrls: ['library.component.css']
})
export class LibraryComponent implements OnInit {
    private _topBarOpened: boolean = true;
    books: Book[] = [];
    selectedBooksFiles: number[] = [];
    genres: Genre[] = [];
    languages: SelectItem[] = [];
    loadingData: boolean = false;
    constructor(private _libraryService: LibraryService) {
    }
    private downloadZipFile(data: Response, fileName) {
        let blob: Blob = data.blob();
        saveAs(blob, fileName);
    }

    downloadBook(book: Book): void {
        if (!book) {
            return;
        }
        let book_file_name = (book.serno) ? book.serno + "." : "";
        book_file_name = book_file_name + book.title + "." + book.ext + ".zip";
        this._libraryService.downloadBook(book)
            .subscribe(data => this.downloadZipFile(data, book_file_name), err => {
                console.log(err);
            });
    }
    private getBookInfo(file: number): Book {
        if (!this.books.length) {
            return null;
        };

        return this.books.find((item) => item.file === file);
    }
    getSelectedInfo(file: number): string {
        let bi: Book = this.getBookInfo(file);
        return bi ? `${bi.title} - ${bi.author}` : "";
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
                    let genreRow = (book.genre.lastIndexOf(":") > -1) ? book.genre.substring(0, book.genre.length - 1) : book.genre;
                    let filteredGenres = [];
                    for (let genreCode of genreRow.split(":")) {
                        let genre = this.genres.find(g => g.code === genreCode);
                        if (genre) {
                            filteredGenres.push(genre.gdesc);
                        }
                    }
                    book.genre = filteredGenres.join(", "); //genre.replace(/:/g, ", ");
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
    private loadGenres() {
        this._libraryService.getGenres().subscribe(genres => {
            this.genres = genres;
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
        this.loadGenres();
        this.loadLanguages();
    }
}
