import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';

export const routes: Routes = [
  { path: '', redirectTo: '/signin', pathMatch: 'full' },
  { path: 'signin', title: 'Signin', component: SigninComponent }
];
