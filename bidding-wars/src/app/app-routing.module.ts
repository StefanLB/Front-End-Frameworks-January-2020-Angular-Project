import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';


const routes: Routes = [
  { path: 'app-login', component: LoginComponent, /*canActivate: */},
  { path: 'app-register', component: RegisterComponent, /*canActivate: [SecureInnerPagesGuard]*/ },
  { path: '', redirectTo: '/app-login', pathMatch: 'full' },
  { path: '**', redirectTo: '/not-found'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
