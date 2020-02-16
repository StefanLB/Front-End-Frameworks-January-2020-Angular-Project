import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';
import { Bid } from '../bid';

// TODO: replace this with real data from your application
const EXAMPLE_DATA: Bid[] = [
  {id: '1', name: 'Hydrogen'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '2', name: 'Helium'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '3', name: 'Lithium'   , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '4', name: 'Beryllium' , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '5', name: 'Boron'     , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '6', name: 'Carbon'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '7', name: 'Nitrogen'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '8', name: 'Oxygen'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '9', name: 'Fluorine'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 150},
  {id: '10', name: 'Hydrogen'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '20', name: 'Helium'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '30', name: 'Lithium'   , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '40', name: 'Beryllium' , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '50', name: 'Boron'     , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '60', name: 'Carbon'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '70', name: 'Nitrogen'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '80', name: 'Oxygen'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '90', name: 'Fluorine'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 160},
  {id: '100', name: 'Hydrogen'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '200', name: 'Helium'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '300', name: 'Lithium'   , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '400', name: 'Beryllium' , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '500', name: 'Boron'     , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '600', name: 'Carbon'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '700', name: 'Nitrogen'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '800', name: 'Oxygen'    , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170},
  {id: '900', name: 'Fluorine'  , createdOn: new Date(), endsOn: new Date(), imageUrl: 'https://test.com', seller: 'testSeller', highestBid: 170}
];

/**
 * Data source for the AllBids view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AllBidsDataSource extends DataSource<Bid> {
  data: Bid[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
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

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: Bid[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Bid[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
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

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a, b, isAsc) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
