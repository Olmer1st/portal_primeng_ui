import {Component, Output, Input, EventEmitter, OnInit} from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
    moduleId: module.id,
    selector: "library",
    templateUrl: "library.component.html",
    styleUrls: ['library.component.css']
})
export class LibraryComponent {
    private _topBarOpened: boolean = true;
    onTogglePanelClicked() {
        this._topBarOpened = !this._topBarOpened;
    }

    private _toggleSearchPanel() {
        this._topBarOpened = !this._topBarOpened;
    }
}
