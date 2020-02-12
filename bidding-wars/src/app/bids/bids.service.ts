import { Injectable } from '@angular/core';
import { Bid } from './bid';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  bidsRef: AngularFireList<any>;
  bidRef: AngularFireObject<any>;


  constructor(private db: AngularFireDatabase) { }

  // Create Bid
  AddBid(bid: Bid) {
    this.bidsRef.push({
      name: bid.name,
      description: bid.description,
      createdOn: bid.createdOn,
      endsOn: bid.endsOn,
      highestBid: 0,
      imageUrl: bid.imageUrl,
      seller: bid.seller
    })
  }

  // Fetch Single Bid Object
  GetBid(id: string) {
    this.bidRef = this.db.object('bids-list/' + id);
    return this.bidRef;
  }

  // Fetch Bids List
  GetBidsList() {
    this.bidsRef = this.db.list('bids-list');
    return this.bidsRef;
  }  

  // Update Bid Object
  UpdateBid(bid: Bid) {
    this.bidRef.update({
      name: bid.name,
      description: bid.description,
      createdOn: bid.createdOn,
      endsOn: bid.endsOn,
      highestBid: bid.highestBid,
      imageUrl: bid.imageUrl,
      seller: bid.seller
    })
  }  

  // Delete Bid Object
  DeleteBid(id: string) { 
    this.bidRef = this.db.object('bids-list/'+id);
    this.bidRef.remove();
  }
}
