import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';

export const routes: Routes = [
  { path: 'Login', component: Login },
   { path: 'Home', component: Home },
  { path: '', component: Login },
  { path: '**', redirectTo: '/Login' },
];
