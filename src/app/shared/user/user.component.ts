import {Component, Output, OnInit, Input, EventEmitter, OnChanges, SimpleChanges} from '@angular/core';
import {IUser, IModule} from '../shared.models';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "user",
    templateUrl: "user.component.html"
})
export class UserComponent implements OnInit, OnChanges {
    @Input()
    user: IUser = null;
    @Input()
    modules: IModule[];
    userModules: SelectItem[] = [];
    @Output() onCancelClicked = new EventEmitter();
    @Output() onSaveClicked = new EventEmitter<IUser>();
    roles: SelectItem[] = [{ label: 'None', value: "" }, { label: 'User', value: "user" }, { label: 'Admin', value: "admin" }];
    get isEmailDisabled(): boolean {
        if (!this.user) {
            return true;
        }

        return !(!this.user.uid);
    }
    cancel(): void {
        this.onCancelClicked.emit();
    }

    save(): void {
        if (this.user.role === 'admin') {
            this.user.modules = [];
        }
        this.onSaveClicked.emit(this.user);
    }
    private cloneModules(modules: IModule[] = []) {
        this.userModules = modules.map(m => {
            return { label: m.title, value: m.name };
        });
    }
    ngOnInit(): void {
        this.cloneModules(this.modules);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.modules && !changes.modules.firstChange) {
            this.cloneModules(changes.modules.currentValue);
        }
        // console.log(changes);
    }
}


export class User implements IUser {
    public uid: string;
    public email: string;
    public display: string;
    public role: string;
    public locked: string;
    public modules: string[];
    public token: string;
    public password: string;
    constructor() { }
    public static clone(user: IUser): IUser {
        return JSON.parse(JSON.stringify(user));
    }
}
