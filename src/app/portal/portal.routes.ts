import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {LibraryComponent} from '../library/library.component';
import {HomeComponent} from '../home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'library',  component: LibraryComponent },
    { path: 'admin',  component: AdminComponent }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class PortalRoutes { }
