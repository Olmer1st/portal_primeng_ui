import {Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../shared/auth.service';
import {MenuModule, MenuItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "header-section",
    templateUrl: "header.component.html"
})
export class HeaderComponent implements OnInit {
    userEmail: string = null;
    userPassword: string = null;
    private items: MenuItem[];
    get currentUser() {
        return this._authService.currentUser;
    }
    constructor(private _router: Router, private _route: ActivatedRoute, private _authService: AuthService) {

    }
    get wellcomeTitle() {
        return `Hello, ${this.currentUser.display}`;
    }
    navigate(routing: string = null) {
        if (!routing) {
            return;
        }
        this._router.navigate([routing]);
    }

    isVisible(routing: string = null) {
        if (!routing) {
            return false;
        }
        return this._authService.isAuthorizedToSee(routing);
    }

    isActive(instruction: string): boolean {
        return this._router.isActive(instruction, true);
    }

    login() {
        this._authService.login(this.userEmail, this.userPassword);
    }
    ngOnInit() {
        this.items = [
            { label: 'Profile', icon: 'fa-cog', routerLink: ['/profile'] },
            {
                label: 'Log Out', icon: 'fa-sign-out', command: () => {
                    this._authService.logout();
                    this.navigate('/home');
                }
            },
        ];
    }
}
