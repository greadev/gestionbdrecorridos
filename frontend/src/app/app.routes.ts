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
        canActivate: [AuthGuard], data: { roles: ['admin', 'gestor'] }
      },
      {
        path: 'recorridos/editar/:id',
        loadComponent: () => import('./recorridos/recorrido-form/recorrido-form').then(m => m.RecorridoFormComponent),
        canActivate: [AuthGuard], data: { roles: ['admin', 'gestor'] }
      },
      {
        path: 'demo-mapa',
        loadComponent: () => import('./mapa/demo-mapa').then(m => m.DemoMapaComponent),
        canActivate: [AuthGuard] // si quieres protegerlo
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
