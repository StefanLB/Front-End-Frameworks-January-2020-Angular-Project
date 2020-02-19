import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { AllBidsDataSource } from './all-bids-datasource';
import { Bid } from '../bid';
import { BidsService } from '../bids.service';

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
    private bidApi: BidsService
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
    return this.dataSource.data.length > 0;
  }

  deleteBid(index: number, e){
    if(window.confirm('Are you sure you want to delete this bid?')) {
      const data = this.dataSource.data;
      data.splice((this.paginator.pageIndex * this.paginator.pageSize) + index, 1);
      this.dataSource.data = data;
      this.bidApi.deleteBid(e.$key);
    }
  }
}
