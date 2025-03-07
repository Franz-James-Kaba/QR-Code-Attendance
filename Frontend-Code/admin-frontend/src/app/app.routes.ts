import { Routes } from '@angular/router';
import { LayoutComponent } from './layouts/auth-layout/layout.component';
import { LayoutComponent as AdminLayoutComponent } from './layouts/admin-layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';

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
        loadComponent: () => import('./features/auth/pages/login/login.component')
          .then(m => m.LoginComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./features/auth/pages/reset-password/reset-password.component')
          .then(m => m.ResetPasswordComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./features/auth/pages/forgot-password/forgot-password.component')
          .then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'unauthorized',
        loadComponent: () => import('./shared/components/unauthorized/unauthorized.component')
          .then(m => m.UnauthorizedComponent)
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard/dashboard.component')
          .then(m => m.DashboardComponent),
        data: { title: 'Dashboard' },
        children: [
          {
            path: 'overview',
            loadComponent: () => import('./features/dashboard/components/overview/overview.component')
              .then(m => m.OverviewComponent),
            data: { title: 'Overview' },
            pathMatch: 'full'
          },
          {
            path: 'users',
            loadComponent: () => import('./features/dashboard/components/users/users.component')
              .then(m => m.UsersComponent),
            data: { title: 'Users' }
          }
        ]
      },
      {
        path: '**',
        loadComponent: () => import('./shared/components/not-found/not-found.component')
          .then(m => m.NotFoundComponent)
      }
    ]
  },
  {
    path: 'unauthorized',
    loadComponent: () => import('./shared/components/unauthorized/unauthorized.component')
      .then(m => m.UnauthorizedComponent)
  },
  {
    path: 'not-found',
    loadComponent: () => import('./shared/components/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  },
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: '**',
    loadComponent: () => import('./shared/components/not-found/not-found.component')
      .then(m => m.NotFoundComponent)
  }
];
