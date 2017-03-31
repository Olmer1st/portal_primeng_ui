import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AdminComponent} from '../admin/admin.component';
import {LibraryComponent} from '../library/library.component';
import {HomeComponent} from '../home/home.component';
import {AuthGuard} from '../shared/auth-guard.service';
import {AuthService} from '../shared/auth.service';
export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    // { path: '**', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    {
        path: 'library', component: LibraryComponent, canActivate: [AuthGuard],
        data: { roles: ['user', 'admin'] }
    },
    {
        path: 'admin', component: AdminComponent, canActivate: [AuthGuard],
        data: { roles: ['admin'] }
    }
];
@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AuthGuard, AuthService]
})
export class PortalRoutes { }
