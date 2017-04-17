import {Component, OnInit, Input} from '@angular/core';
import {IUser} from '../shared.models';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "user.component.html"
})
export class UserComponent {
    @Input()
    user: IUser = null;
    roles: SelectItem[] = [{ label: 'None', value: "" }, { label: 'User', value: "user" }, { label: 'Admin', value: "admin" }];
}


export class User implements IUser {
    public uid: string;
    public email: string;
    public display: string;
    public role: string;
    public locked: boolean;
    public modules: string[];
    public token: string;
    public password: string;
    constructor() { }
    public static clone(user: IUser): IUser {
        return JSON.parse(JSON.stringify(user));
    }
}
