import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "library",
    templateUrl: "library.component.html",
    styleUrls:['library.component.css']
})
export class LibraryComponent {
    private _opened: boolean = true;

    private _toggleSidebar() {
        this._opened = !this._opened;
    }
}
