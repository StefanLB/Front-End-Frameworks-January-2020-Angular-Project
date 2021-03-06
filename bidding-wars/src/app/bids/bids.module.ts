import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBidsComponent } from './all-bids/all-bids.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddBidComponent } from './add-bid/add-bid.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';
import { ViewBidComponent } from './view-bid/view-bid.component';
import { BidDialogComponent } from './bid-dialog/bid-dialog.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatProgressBarModule } from '@angular/material';
import { CreatedBidsComponent } from './created-bids/created-bids.component';
import { PlacedBidsComponent } from './placed-bids/placed-bids.component';




@NgModule({
  declarations: [AllBidsComponent, AddBidComponent, EditBidComponent, ViewBidComponent, BidDialogComponent, CreatedBidsComponent, PlacedBidsComponent],
  entryComponents: [BidDialogComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
    ReactiveFormsModule,
    RouterModule,
    MatProgressBarModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BidsModule { }
