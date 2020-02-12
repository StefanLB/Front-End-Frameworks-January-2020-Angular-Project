import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllBidsComponent } from './bids/all-bids/all-bids.component';
import { AddBidComponent } from './bids/add-bid/add-bid.component';
import { EditBidComponent } from './bids/edit-bid/edit-bid.component';


const routes: Routes = [
  { path: 'app-login', component: LoginComponent /*canActivate: */},
  { path: 'app-register', component: RegisterComponent, /*canActivate: [SecureInnerPagesGuard]*/ },
  { path: 'all-bids', component: AllBidsComponent},
  { path: 'add-bid', component: AddBidComponent },
  { path: 'edit-bid/:id', component: EditBidComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
