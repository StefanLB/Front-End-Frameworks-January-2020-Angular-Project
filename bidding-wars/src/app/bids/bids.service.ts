import { Injectable } from '@angular/core';
import { Bid } from './bid';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material'

@Injectable({
  providedIn: 'root'
})
export class BidsService {
  bidsRef: AngularFireList<any>;
  bidRef: AngularFireObject<any>;

  constructor(
    private db: AngularFireDatabase,
    public router: Router,
    private snackBar: MatSnackBar
  ) { }

  // Create Bid
  addBid(bid: Bid) {
    this.bidsRef.push({
      name: bid.name,
      description: bid.description,
      createdOn: bid.createdOn,
      endsOn: bid.endsOn,
      imageUrl: bid.imageUrl,
      seller: bid.seller,
      sellerEmail: bid.sellerEmail,
      highestBid: bid.highestBid,
      highestBidder: bid.highestBidder,
      highestBidderEmail: bid.highestBidderEmail,
      bidders: ['']
    })
      .then(() => {
        this.snackBar.open('Bid successfully created!', 'Dismiss', { duration: 2000 });
      });
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
      highestBidder: bid.highestBidder,
      bidders: bid.bidders
    })
      .then(() => {
        this.snackBar.open('Bid successfully placed!', 'Dismiss', { duration: 2000 });
        this.router.navigate(['bids']);
      });
  }

  // Update New Bid Object
  updateNewBid(id, bid: Bid) { //*** NOTE: YOU SHOULD ONLY BE ABLE TO EDIT BIDS IF NO ONE HAS YET MADE AN OFFER ***/
    this.bidRef.update({ //*** NOTE2: THE UPDATE BID SHOULD ALSO BE USED FOR WHEN SOMEONE BIDS ON AN OFFER ***/
      name: bid.name,
      description: bid.description,
      endsOn: bid.endsOn,
      imageUrl: bid.imageUrl,
      highestBid: bid.highestBid
    }).then(() => {
      this.snackBar.open('Bid successfully updated!', 'Dismiss', { duration: 2000 });
      this.router.navigate(['bids']);
    });
  }

  // Delete New Bid Object
  deleteBid(id: string) { //*** NOTE: YOU SHOULD ONLY BE ABLE TO DELETE BIDS IF NO ONE HAS YET MADE AN OFFER ***/
    this.bidRef = this.db.object('all-bids/' + id);
    this.bidRef.remove()
      .then(() => {
        this.snackBar.open('Bid successfully deleted!', 'Dismiss', { duration: 2000 });
        this.router.navigate(['bids']);
      })
      .catch(error => {
        this.snackBar.open('An error occurred while attempting to delete!', 'Dismiss', { duration: 5000 });
      });

  }
}
