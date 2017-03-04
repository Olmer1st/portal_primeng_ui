'use strict';

import {Component, Input, Output, EventEmitter} from '@angular/core';

const _label: string = "Search";

@Component({
    moduleId: module.id,
    selector: 'searchbox-section',
    templateUrl: 'searchbox.component.html'
})
export class SearchboxComponent {
    private _name: string = "";
    private _searchParam: string = "";
    _hover: boolean = false;

    @Input()
    set placeholder(name: string){
        this._name = (name && name.trim()) || '';
    }
    get placeholder(): string {
        if (this._name) {
            return _label + " " + this._name;
        }
        return _label;
    }
    @Input()
    set searchParam(s: string){
        this._searchParam = s;
    }
    get searchParam(): string {
        return this._searchParam;
    }

    @Output() onSearch = new EventEmitter<string>();
    @Output() onClear = new EventEmitter();

    searchClick(): void {
        this.onSearch.emit(this._searchParam);
    }
    clearClick(): void {
        this.onClear.emit();
        this._searchParam = "";
    }

}
