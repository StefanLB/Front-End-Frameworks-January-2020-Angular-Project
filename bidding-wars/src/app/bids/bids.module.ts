import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AllBidsComponent } from './all-bids/all-bids.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';



@NgModule({
  declarations: [AllBidsComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ]
})
export class BidsModule { }
