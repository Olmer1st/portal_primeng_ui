import {NgModule}      from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { SearchboxComponent } from '../shared/searchbox/searchbox.component';
import { SpinnerComponent }  from '../shared/spinner/spinner.component';

import {PortalComponent} from './portal.component';
import {LibraryComponent} from '../library/library.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import {HomeComponent} from '../home/home.component';
import {AdminComponent} from '../admin/admin.component';
import {DataTableModule, DropdownModule, InputSwitchModule, PanelModule, ButtonModule, SplitButtonModule, ToolbarModule, InputTextModule,
    AutoCompleteModule, TreeTableModule, SharedModule} from 'primeng/primeng';
import { SidebarModule } from 'ng-sidebar';
import {PortalRoutes} from './portal.routes';
import {APP_CONFIG, PORTAL_CONFIG} from './portal.providers';
import {EmitterService} from '../shared/emitter.service';
import { FileSizePipe } from '../shared/filesize.pipe';

@NgModule({
    imports: [
        BrowserModule,
        CommonModule,
        FormsModule,
        PortalRoutes,
        DataTableModule, InputSwitchModule, DropdownModule,
        PanelModule, ButtonModule, SplitButtonModule, ToolbarModule, InputTextModule, AutoCompleteModule, TreeTableModule, SharedModule,
        HttpModule,
        JsonpModule,
        SidebarModule
    ],
    declarations: [
        PortalComponent,
        HeaderComponent,
        FooterComponent,
        AdminComponent,
        LibraryComponent,
        HomeComponent,
        SearchboxComponent,
        SpinnerComponent,
        FileSizePipe
    ],
    providers: [
        { provide: APP_CONFIG, useValue: PORTAL_CONFIG },
        EmitterService
    ],
    bootstrap: [PortalComponent]
})
export class PortalModule {
}
