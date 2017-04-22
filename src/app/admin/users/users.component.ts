import {Component, OnInit, Input} from '@angular/core';
import {AdminService} from '../admin.service';
import {IUser, IModule} from '../../shared/shared.models';
import {User} from '../../shared/user/user.component';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "users",
    templateUrl: "users.component.html"
})
export class UsersComponent implements OnInit {
    @Input()
    modules: IModule[];
    users: IUser[] = [];
    dialogDisplay: boolean = false;
    selectedUser: IUser = null;
    constructor(private _adminService: AdminService) { }
    refresh() {
        this.loadUsers();
    }
    translateModules(modules) {
        if (!modules || !modules.length) {
            return "";
        }
        return modules.map(m => {
            return this.modules.find(t => {
                return t.name === m;
            }
            ).title;
        }).join(",");
    }
    newUser() {
        this.selectedUser = new User();
        this.dialogDisplay = true;
    }
    onCancelClicked(): void {
        this.dialogDisplay = false;
    }
    onSaveClicked(user: IUser): void {
        this._adminService.modifyUser(user).subscribe(me => {
            if (me && !me.error) {
                let tmp = this.users.find(u => u.uid === me.uid);
                if (tmp) {
                    tmp.role = me.role;
                    tmp.display = me.display;
                    tmp.modules = me.modules;
                } else {
                    this.users.push(me);
                }
            }
        }, err => {
            // Log errors if any
            console.log(err);
        });
        this.dialogDisplay = false;
    }
    lockUser(user: IUser) {
        if (!user) {
            return;
        }
        let lock = (!parseInt(user.locked, 10)) ? 1 : 0;
        this._adminService.lockUser(user.uid, lock).subscribe(r => {
            if (r && !r.error) {
                user.locked = lock.toString();
            } else {
                console.error(user);
            }
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    delete(user: IUser) {
        if (!user) {
            return;
        }
        this._adminService.deleteUser(user.uid).subscribe(r => {
            if (r && !r.error) {
                let index = this.users.findIndex(u => u.uid === user.uid);
                this.users.splice(index, 1);
            } else {
                console.error(user);
            }
        }, err => {
            // Log errors if any
            console.log(err);
        });
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
