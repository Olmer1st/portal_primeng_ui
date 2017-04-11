import {NgModule}      from '@angular/core';
import { CommonModule } from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

import { SearchboxComponent } from '../shared/searchbox/searchbox.component';
import { SpinnerComponent }  from '../shared/spinner/spinner.component';
import { SearchPanelComponent }  from '../library/searchpanel/searchpanel.component';
import { UserComponent }  from '../admin/user/user.component';
import { UsersComponent }  from '../admin/users/users.component';
import {PortalComponent} from './portal.component';
import {HeaderComponent} from '../header/header.component';
import {FooterComponent} from '../footer/footer.component';
import { DataTableModule, DropdownModule, InputSwitchModule, PanelModule, CheckboxModule, DialogModule,
    ButtonModule, SplitButtonModule, ToolbarModule, InputTextModule,
    PasswordModule, AutoCompleteModule, TreeTableModule, SharedModule} from 'primeng/primeng';
import { SidebarModule } from 'ng-sidebar';
import {PortalRoutes, routedComponents} from './portal.routes';
import {APP_CONFIG, PORTAL_CONFIG} from './portal.providers';
import { FileSizePipe } from '../shared/filesize.pipe';
import {LibraryService} from '../library/library.service';
import {AdminService} from '../admin/admin.service';
@NgModule({
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        CommonModule,
        FormsModule,
        PortalRoutes,
        DataTableModule, InputSwitchModule, DropdownModule, PasswordModule, CheckboxModule, DialogModule,
        PanelModule, ButtonModule, SplitButtonModule, ToolbarModule, InputTextModule, AutoCompleteModule, TreeTableModule, SharedModule,
        HttpModule,
        JsonpModule,
        SidebarModule
    ],
    declarations: [
        PortalComponent,
        routedComponents,
        HeaderComponent,
        FooterComponent,
        SearchPanelComponent,
        SearchboxComponent,
        SpinnerComponent,
        FileSizePipe,
        UserComponent,
        UsersComponent
    ],
    providers: [
        { provide: APP_CONFIG, useValue: PORTAL_CONFIG },
        LibraryService,
        AdminService
    ],
    bootstrap: [PortalComponent]
})
export class PortalModule {
}
