import {Component, OnInit} from '@angular/core';
import {AdminService} from './admin.service';
import {IModule} from './../shared/shared.models';
import {SelectItem, MenuItem} from 'primeng/primeng';

@Component({
    moduleId: module.id,
    selector: "admin",
    templateUrl: "admin.component.html"
})
export class AdminComponent {
    modules: IModule[] = [];
    loadingData: boolean = false;
    private adminTabs: MenuItem[];
    private activeTab: MenuItem;
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
        this.adminTabs = [
            {
                label: 'Modules', icon: 'fa-puzzle-piece', command: (event) => {
                    //event.originalEvent: Browser event
                    //event.item: menuitem metadata
                    this.activeTab = event.item;
                }
            },
            {
                label: 'Users', icon: 'fa-users', command: (event) => {
                    //event.originalEvent: Browser event
                    //event.item: menuitem metadata
                    this.activeTab = event.item;
                }
            },
            {
                label: 'Active Users', icon: 'fa-user-circle-o', command: (event) => {
                    //event.originalEvent: Browser event
                    //event.item: menuitem metadata
                    this.activeTab = event.item;
                }
            },
            {
                label: 'News', icon: 'fa-news', command: (event) => {
                    //event.originalEvent: Browser event
                    //event.item: menuitem metadata
                    this.activeTab = event.item;
                }
            }
        ];
        this.activeTab = this.adminTabs[2];
    }
}
