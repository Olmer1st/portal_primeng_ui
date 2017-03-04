import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    moduleId: module.id,
    selector: "header-section",
    templateUrl: "header.component.html"
})
export class HeaderComponent implements OnInit {

    constructor(private _router: Router, private _route: ActivatedRoute) {

    }
    navigate(routing: string = null) {
        if (!routing) {
            return;
        }
        this._router.navigate([routing]);
    }

    isActive(instruction: string): boolean {
        return this._router.isActive(instruction, true);
    }
    ngOnInit() {

    }
}
