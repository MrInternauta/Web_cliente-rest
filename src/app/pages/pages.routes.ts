import { Routes, RouterModule } from '@angular/router';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { LoginGuardGuard, AdminGuardGuard } from '../services/service.index';
import { ProfileComponent } from './profile/profile.component';
import { CategoriaComponent } from './categoria/categoria.component';
import { ParticipanteComponent } from './participante/participante.component';

const pageRute: Routes = [
    {
        path: '',
        component: PagesComponent,
        canActivate: [LoginGuardGuard],
        children: [
            {path: 'quien', component: DashboardComponent, data: {titulo: 'Quien es más'}},
            // {path: 'progress', component: ProgressComponent, data: {titulo: 'Progress'}},
            // {path: 'graficas1', component: Graficas1Component, data: {titulo: 'Graficas'}},
            // {path: 'promesas', component: PromesasComponent, data: {titulo: 'Promesas'}},
            // {path: 'rxjs', component: RxjsComponent, data: {titulo: 'Rxjs'}},
            {path: 'acount-setting', component: AccountSettingsComponent, data: {titulo: 'Ajustes del tema'}},
            {path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil de usuario'}},
            {path: '', redirectTo : '/quien', pathMatch: 'full'}
        ]
    },
    {
        path: '',
        component: PagesComponent,
        canActivate: [AdminGuardGuard],
        children: [
            {path: 'categoria', component: CategoriaComponent, data: {titulo: 'Categorias'}},
            {path: 'participante', component: ParticipanteComponent, data: {titulo: 'Participantes'}}
        ]
    }
];
export const PAGES_ROUTES =  RouterModule.forChild(pageRute);
