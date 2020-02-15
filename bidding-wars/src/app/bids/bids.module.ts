import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBidsComponent } from './all-bids/all-bids.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { AddBidComponent } from './add-bid/add-bid.component';
import { EditBidComponent } from './edit-bid/edit-bid.component';
import { DeleteBidComponent } from './delete-bid/delete-bid.component';
import { ViewBidComponent } from './view-bid/view-bid.component';
import { MaterialModule } from '../material.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AllBidsComponent, AddBidComponent, EditBidComponent, DeleteBidComponent, ViewBidComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BidsModule { }
