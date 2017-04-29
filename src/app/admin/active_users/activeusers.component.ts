import {Component, OnInit, Input} from '@angular/core';
import {AdminService} from '../admin.service';
import {IUser, IModule, IActiveUser} from '../../shared/shared.models';

import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "activeusers",
    templateUrl: "activeusers.component.html"
})
export class ActiveUsersComponent implements OnInit {
    users: IActiveUser[] = [];
    constructor(private _adminService: AdminService) { }
    private loadActiveUsers() {
        this._adminService.getActiveUsers().subscribe(users => {
            this.users = users;
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    ngOnInit(): void {
        this.loadActiveUsers();
    }
}
