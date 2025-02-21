import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { ResetPasswordComponent } from './pages/reset-password/reset-password.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', title: 'Signin', component: SigninComponent },
  { path: 'reset-password', title: 'Reset Password', component: ResetPasswordComponent }
];
