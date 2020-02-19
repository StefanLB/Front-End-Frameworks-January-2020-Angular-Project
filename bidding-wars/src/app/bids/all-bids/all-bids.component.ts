import { Bid } from '../bid';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BidsService } from '../bids.service';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';

@Component({
  selector: 'app-all-bids',
  templateUrl: './all-bids.component.html',
  styleUrls: ['./all-bids.component.scss']
})

export class AllBidsComponent {

  dataSource: MatTableDataSource<Bid>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  BidData: any = [];

  displayedColumns: any[] = [
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
    ) {
    this.bidApi.getBidsList()
      .snapshotChanges().subscribe(bids => {
        bids.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.BidData.push(a as Bid)
        })
        /* Data table */
        this.dataSource = new MatTableDataSource(this.BidData);
        /* Pagination */
        setTimeout(() => {
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }, 0);
      })
  }

  get isReady() {
    if (this.BidData.length > 0) {
      return true;
    }
    return false;
  }

  deleteBid(index: number, e) {
    this.bidApi.deleteBid(e.$key);
    const data = this.dataSource.data;
    data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
    this.dataSource.data = data;
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