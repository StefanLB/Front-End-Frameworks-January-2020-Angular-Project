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
import { DeleteBidComponent } from './bids/delete-bid/delete-bid.component';
import { ViewBidComponent } from './bids/view-bid/view-bid.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: HomeComponent },
  { path: 'login', component: LoginComponent /*canActivate: */},
  { path: 'register', component: RegisterComponent, /*canActivate: [SecureInnerPagesGuard]*/ },
  { path: 'bids', component: AllBidsComponent},
  { path: 'bids/add', component: AddBidComponent },
  { path: 'bids/edit/:id', component: EditBidComponent },
  { path: 'bids/delete/:id', component: DeleteBidComponent },
  { path: 'bids/:id', component: ViewBidComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
