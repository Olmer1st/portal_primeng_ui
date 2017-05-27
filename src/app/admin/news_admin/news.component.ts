import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {AdminService} from '../admin.service';
import {IModule, INewsFile} from '../../shared/shared.models';

@Component({
    moduleId: module.id,
    selector: "newsadmin",
    templateUrl: "news.component.html",
    styleUrls: ["news.component.css"]
})
export class NewsAdminComponent implements OnInit {
    @Input()
    modules: IModule[];
    news:INewsFile[];
    selectedNewsFile: INewsFile = null;
    dialogDisplay: boolean = false;
    constructor(private _adminService: AdminService) { }

    newNewsFile() {
        this.selectedNewsFile = new NewsFile();
        this.dialogDisplay = true;
    }
    ngOnInit(): void {
    }
}

class NewsFile implements INewsFile {

    nid:string;
    module:string;
    title:string;
    shortdesc:string;
    fulldesc:string;
    picture:string;
    inserted:string;
    constructor() { }
    public static clone(me: INewsFile): INewsFile {
        return JSON.parse(JSON.stringify(me));
    }
}
