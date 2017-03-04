import {Component} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: "library",
    templateUrl: "library.component.html"
})
export class LibraryComponent {
    private _opened: boolean = false    ;

    private _togglePanel() {
        this._opened = !this._opened;
    }
}
