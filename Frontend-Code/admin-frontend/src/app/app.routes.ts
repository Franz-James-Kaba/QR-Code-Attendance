import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/auth-layout/layout.component';

export const routes: Routes = [
  {
    path: 'auth',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: 'login',
        loadComponent: () => import('./features/auth/pages/login/login.component').then(m => m.LoginComponent)
      }
    ]
  },
  {
    path: '',      // Redirect root to auth/login
    redirectTo: 'auth/login',
    pathMatch: 'full'
  }
];
