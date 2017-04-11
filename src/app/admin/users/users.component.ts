import {Component, OnInit} from '@angular/core';
import {AdminService} from '../admin.service';
import {User} from '../../shared/shared.models';

@Component({
    moduleId: module.id,
    selector: "users",
    templateUrl: "users.component.html"
})
export class UsersComponent implements OnInit {
    users: User[] = [];
    dialogDisplay: boolean = false;
    selectedUser: User = null;
    constructor(private _adminService: AdminService) {

    }
    newUser() {
        this.selectedUser = null;
        this.dialogDisplay = true;
    }
    save() {
        this.dialogDisplay = false;
    }

    edit(user: User) {
        this.selectedUser = user;
        this.dialogDisplay = true;
    }
    private loadUsers() {
        this._adminService.getUsers().subscribe(users => {
            this.users = users;
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    ngOnInit(): void {
        this.loadUsers();
    }
}
