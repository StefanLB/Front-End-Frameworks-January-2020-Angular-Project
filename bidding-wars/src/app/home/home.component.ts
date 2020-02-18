import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BidsService } from '../bids/bids.service';
import { Bid } from '../bids/bid';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  sampleBids: Bid[] = [];

  constructor(
    private router: Router,
    private bidApi: BidsService
  ) { 
    this.bidApi.getBidsList()
    .snapshotChanges().subscribe(bids => {
      bids.forEach(item => {
          let a = item.payload.toJSON();
          a['$key'] = item.key;
          this.sampleBids.push(a as Bid)
        })
      });
  }

  ngOnInit() {
  }

  login() {
    this.router.navigate(['/login'])
  }

  register() {
    this.router.navigate(['/register'])
  }
}
