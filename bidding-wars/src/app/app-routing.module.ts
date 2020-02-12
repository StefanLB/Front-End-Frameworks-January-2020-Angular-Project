import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllBidsComponent } from './bids/all-bids/all-bids.component';


const routes: Routes = [
  { path: 'app-login', component: LoginComponent /*canActivate: */},
  { path: 'app-register', component: RegisterComponent, /*canActivate: [SecureInnerPagesGuard]*/ },
  { path: 'all-bids', component: AllBidsComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
