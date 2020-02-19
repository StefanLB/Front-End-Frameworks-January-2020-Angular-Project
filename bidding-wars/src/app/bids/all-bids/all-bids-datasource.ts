import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Bid } from '../bid';
import { BidsService } from '../bids.service';

/**
 * Data source for the AllBids view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AllBidsDataSource extends DataSource<Bid> {
  data: Bid[] = [];
  paginator: MatPaginator;
  sort: MatSort;

  constructor(bidApi : BidsService) {
    super();
    bidApi.getBidsList()
    .snapshotChanges().subscribe(bids => {
      bids.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.data.push(a as Bid);
        })
      });
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Bid[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: Bid[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: Bid[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'createdOn': return compare(a.createdOn, b.createdOn, isAsc);
        case 'endsOn': return compare(a.endsOn, b.endsOn, isAsc);
        case 'imageUrl': return compare(a.imageUrl, b.imageUrl, isAsc);
        case 'seller': return compare(a.seller, b.seller, isAsc);
        case 'highestBid': return compare(+a.highestBid, +b.highestBid, isAsc);
        default: return 0;
      }
    });
  }
}

function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
