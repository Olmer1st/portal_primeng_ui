import {Component, OnInit, Input} from '@angular/core';
import {AdminService} from '../admin.service';
import {IModule} from '../../shared/shared.models';

@Component({
    moduleId: module.id,
    selector: "modules",
    templateUrl: "modules.component.html"
})
export class ModulesComponent implements OnInit {
    @Input()
    modules: IModule[] = [];
    dialogDisplay: boolean = false;
    selectedModule: IModule = null;
    constructor(private _adminService: AdminService) {

    }
    newModule() {
        this.selectedModule = new Module();
        this.dialogDisplay = true;
    }
    save() {
        this._adminService.modifyModule(this.selectedModule).subscribe(me => {
            if (me && !me.error) {
                let tmp = this.modules.find(m => m.mid === me.mid);
                if (tmp) {
                    tmp.name = me.name;
                    tmp.title = me.title;
                } else {
                    this.modules.push(me);
                }
            } else {
                console.error(me);
            }
        }, err => {
            // Log errors if any
            console.log(err);
        });
        this.dialogDisplay = false;
    }
    delete(me: IModule) {
        if (!me) {
            return;
        }
        this._adminService.deleteModule(me.mid).subscribe(r => {
            if (r && !r.error) {
                let index = this.modules.findIndex(m => m.mid === me.mid);
                this.modules.splice(index, 1);
            } else {
                console.error(me);
            }
        }, err => {
            // Log errors if any
            console.log(err);
        });
    }
    edit(me: IModule) {
        this.selectedModule = Module.clone(me);
        this.dialogDisplay = true;
    }

    ngOnInit(): void {
    }
}

class Module implements IModule {

    public name: string;
    public title: string;
    public mid: string;
    constructor() { }
    public static clone(me: IModule): IModule {
        return JSON.parse(JSON.stringify(me));
    }
}
