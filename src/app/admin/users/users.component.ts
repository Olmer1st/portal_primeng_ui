import {Component, OnInit, Input} from '@angular/core';
import {AdminService} from '../admin.service';
import {IUser, IModule} from '../../shared/shared.models';
import {User} from '../../shared/user/user.component';
@Component({
    moduleId: module.id,
    selector: "users",
    templateUrl: "users.component.html"
})
export class UsersComponent implements OnInit {
    @Input()
    modules: IModule[] = [];
    users: IUser[] = [];
    dialogDisplay: boolean = false;
    selectedUser: IUser = null;
    constructor(private _adminService: AdminService) {

    }
    newUser() {
        this.selectedUser = new User();
        this.dialogDisplay = true;
    }
    save() {
        this.dialogDisplay = false;
    }

    edit(user: IUser) {
        let cU = User.clone(user);
        delete cU.password;
        this.selectedUser = cU;
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
