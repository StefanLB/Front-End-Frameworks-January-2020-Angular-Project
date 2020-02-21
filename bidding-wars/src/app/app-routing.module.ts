import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllBidsComponent } from './bids/all-bids/all-bids.component';
import { AddBidComponent } from './bids/add-bid/add-bid.component';
import { EditBidComponent } from './bids/edit-bid/edit-bid.component';
import { HomeComponent } from './home/home.component';
import { ViewBidComponent } from './bids/view-bid/view-bid.component';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ProfileComponent } from './user/profile/profile.component';
import { CreatedBidsComponent } from './bids/created-bids/created-bids.component';
import { PlacedBidsComponent } from './bids/placed-bids/placed-bids.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent, canActivate: [AuthGuard], data: { isLogged: false} },
  { path: 'login', component: LoginComponent, canActivate: [AuthGuard], data: { isLogged: false} },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard], data: { isLogged: false} },
  { path: 'bids', component: AllBidsComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'bids/add', component: AddBidComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'bids/placed', component: PlacedBidsComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'bids/created', component: CreatedBidsComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'bids/edit/:id', component: EditBidComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'bids/:id', component: ViewBidComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { isLogged: true} },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
