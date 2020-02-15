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
  addBid(bid: Bid) {
    this.bidsRef.push({
      name: bid.name,
      description: bid.description,
      createdOn: bid.createdOn,
      endsOn: bid.endsOn,
      imageUrl: bid.imageUrl,
      seller: bid.seller,
      highestBid: 0,
      highestBidder: ''
    })
  }

  // Fetch Single Bid Object
  getBid(id: string) {
    this.bidRef = this.db.object('all-bids/' + id);
    return this.bidRef;
  }

  // Fetch Bids List
  getBidsList() {
    this.bidsRef = this.db.list('all-bids');
    return this.bidsRef;
  }  

  // Update Bid Object
  updateBid(id, bid: Bid) { //*** NOTE: YOU SHOULD ONLY BE ABLE TO EDIT BIDS IF NO ONE HAS YET MADE AN OFFER ***/
    this.bidRef.update({ //*** NOTE2: THE UPDATE BID SHOULD ALSO BE USED FOR WHEN SOMEONE BIDS ON AN OFFER ***/
      highestBid: bid.highestBid,
      highestBidder: bid.highestBidder
    })
  }  

  // Update New Bid Object
  updateNewBid(id, bid: Bid) { //*** NOTE: YOU SHOULD ONLY BE ABLE TO EDIT BIDS IF NO ONE HAS YET MADE AN OFFER ***/
    this.bidRef.update({ //*** NOTE2: THE UPDATE BID SHOULD ALSO BE USED FOR WHEN SOMEONE BIDS ON AN OFFER ***/
      name: bid.name,
      description: bid.description,
      endsOn: bid.endsOn,
      imageUrl: bid.imageUrl
    })
  } 

  // Delete New Bid Object
  deleteBid(id: string) { //*** NOTE: YOU SHOULD ONLY BE ABLE TO DELETE BIDS IF NO ONE HAS YET MADE AN OFFER ***/
    this.bidRef = this.db.object('all-bids/'+id);
    this.bidRef.remove()
      .catch(error => {
        console.log(error);
      });
  }
}
