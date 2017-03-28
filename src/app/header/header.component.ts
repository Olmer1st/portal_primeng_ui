import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../shared/auth.service';

@Component({
    moduleId: module.id,
    selector: "header-section",
    templateUrl: "header.component.html"
})
export class HeaderComponent implements OnInit {
    userEmail: string = null;
    userPassword: string = null;
    get currentUser() {
        return this._authService.currentUser;
    }
    constructor(private _router: Router, private _route: ActivatedRoute, private _authService: AuthService) {

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

    login() {
        this._authService.login(this.userEmail, this.userPassword);
    }
    ngOnInit() {

    }
}
