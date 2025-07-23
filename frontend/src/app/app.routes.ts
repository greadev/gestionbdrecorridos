import { Routes } from '@angular/router';
import { AuthGuard } from './core/auth.guard';
import { MainLayoutComponent } from './layout/main-layout/main-layout';


export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'recorridos',
        loadComponent: () => import('./recorridos/recorridos-list/recorridos-list').then(m => m.RecorridosListComponent),
        canActivate: [AuthGuard]
      },
      {
        path: 'recorridos/:id',
        loadComponent: () => import('./recorridos/recorrido-detail/recorrido-detail').then(m => m.RecorridoDetailComponent),
        canActivate: [AuthGuard]
      },
      {
        path: '',
        redirectTo: '/recorridos',
        pathMatch: 'full'
      },
      {
        path: 'recorridos/nuevo',
        loadComponent: () => import('./recorridos/recorrido-form/recorrido-form').then(m => m.RecorridoFormComponent),
        canActivate: [AuthGuard], data: { roles: [ 'superadmin', 'admin', 'gestor'] }
      },
      {
        path: 'recorridos/editar/:id',
        loadComponent: () => import('./recorridos/recorrido-form/recorrido-form').then(m => m.RecorridoFormComponent),
        canActivate: [AuthGuard], data: { roles: ['superadmin', 'admin', 'gestor'] }
      },
      {
        path: 'demo-mapa',
        loadComponent: () => import('./mapa/demo-mapa').then(m => m.DemoMapaComponent),
        canActivate: [AuthGuard] // si quieres protegerlo
      },
      {
        path: 'usuarios/nuevo',
        loadComponent: () => import('./usuarios/usuario-register/usuario-register').then(m => m.UsuarioRegisterComponent),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'superadmin'] }
      },
      {
        path: 'usuarios/reset-password',
        loadComponent: () => import('./usuarios/reset-password/reset-password').then(m => m.ResetPasswordComponent),
        canActivate: [AuthGuard],
        data: { roles: ['admin', 'superadmin'] }
      }
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login').then(m => m.LoginComponent)
  },
  {
    path: '**',
    loadComponent: () => import('./core/not-found/not-found').then(m => m.NotFoundComponent)
  }
];
