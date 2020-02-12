import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBidsComponent } from './all-bids/all-bids.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddBidComponent } from './add-bid/add-bid.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';



@NgModule({
  declarations: [AllBidsComponent, AddBidComponent, EditBidComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BidsModule { }
