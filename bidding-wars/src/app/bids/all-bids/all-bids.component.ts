import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AllBidsDataSource } from './all-bids-datasource';
import { Bid } from '../bid';
import { BidsService } from '../bids.service';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';

@Component({
  selector: 'app-all-bids',
  templateUrl: './all-bids.component.html',
  styleUrls: ['./all-bids.component.scss']
})
export class AllBidsComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  @ViewChild(MatTable, {static: false}) table: MatTable<Bid>;
  dataSource: AllBidsDataSource;
  data: Bid[] = [];

  displayedColumns = [
  'name',
  'createdOn',
  'endsOn',
  'imageUrl',
  'seller',
  'highestBid',
  'action'
  ];

  constructor(
    private bidApi: BidsService,
    private dialog: MatDialog

  ) { }

  ngOnInit() {
    this.dataSource = new AllBidsDataSource(this.bidApi);
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  
  get isReady(){

    return true;
    if(this.dataSource !== undefined){
      return this.dataSource.data.length > 0;
    }
  }

  deleteBid(index: number, e){
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.bidApi.deleteBid(e.$key);
  }

  confirmDeleteDialog(index: number, e) {
    let dialogRef = this.dialog.open(BidDialogComponent,
      {
        data: {
          action: "Delete",
          actionDescription: "delete this bid",
          confirmPhrase: "Delete Bid"
        }
      });


    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.deleteBid(index, e);
      }
    });

  }
}
