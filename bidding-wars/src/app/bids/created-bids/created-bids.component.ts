import { Bid } from '../bid';
import { Component, ViewChild } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { BidsService } from '../bids.service';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { map, switchMap } from 'rxjs/operators';
import { Observable, empty } from 'rxjs';

@Component({
  selector: 'app-created-bids',
  templateUrl: './created-bids.component.html',
  styleUrls: ['./created-bids.component.scss']
})
export class CreatedBidsComponent {

  dataSource: MatTableDataSource<Bid>;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  user: firebase.User;
  BidData: any = [];

  displayedColumns: any[] = [
    'name',
    'createdOn',
    'endsOn',
    'imageUrl',
    'highestBid',
    'action'
  ];

  constructor(
    private auth: AuthService,
    private bidApi: BidsService,
    private dialog: MatDialog
  ) {
      this.auth.getUserState().subscribe(user => {
        const userEmail = user.email;
        if (userEmail !== null && userEmail !== undefined) {
          this.bidApi.getBidsList()
          .snapshotChanges().subscribe(bids => {
            bids.forEach(item => {
              let a = item.payload.toJSON();
              if ((a as Bid).sellerEmail == userEmail) {
                console.log(a);
                a['$key'] = item.key;
                this.BidData.push(a as Bid)
              }
            })

            this.dataSource = new MatTableDataSource(this.BidData);
            setTimeout(() => {
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }, 0);
          });
        }
      });

      // { Can't figure out how to apply rxjs
      //   this.auth.getUserState().pipe(
      //     map(user => user['email']),
      //     switchMap(userEmail => userEmail ? this.bidApi.getBidsList().snapshotChanges() : empty()))
      //     .subscribe(bids => {
      //       bids.forEach(item => {
      //         let a = item.payload.toJSON();
      //         if ((a as Bid).sellerEmail == userEmail) {
      //           console.log(a);
      //           a['$key'] = item.key;
      //           this.BidData.push(a as Bid)
      //         }
      //       })

      //       this.dataSource = new MatTableDataSource(this.BidData);
      //       setTimeout(() => {
      //         this.dataSource.paginator = this.paginator;
      //         this.dataSource.sort = this.sort;
      //       }, 0);
      //     });
      // }

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
