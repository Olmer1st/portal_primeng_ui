import {Component, OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import {IModule} from './../shared/shared.models';
import {SelectItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "admin",
    templateUrl: "admin.component.html"
})
export class AdminComponent {
    modules: IModule[] = [];
    loadingData: boolean = false;

    constructor(private _adminService: AdminService) { }
    onModulesChanged() {
        let modules = this.modules.map(m => m);
        this.modules = modules;
    }
    private loadModules() {
        this.loadingData = true;
        this._adminService.getModules().subscribe(modules => {
            this.modules = modules;
            this.loadingData = false;
        }, err => {
            // Log errors if any
            console.log(err);
            this.loadingData = false;
        });
    }

    ngOnInit(): void {
        this.loadModules();
    }
}
