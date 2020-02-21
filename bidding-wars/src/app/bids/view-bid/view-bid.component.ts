import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { Location } from '@angular/common';
import { BidsService } from '../bids.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';
import { Bid } from '../bid';

@Component({
  selector: 'app-view-bid',
  templateUrl: './view-bid.component.html',
  styleUrls: ['./view-bid.component.scss']
})
export class ViewBidComponent implements OnInit {
  user: firebase.User;
  editBidForm: FormGroup;
  currentHighestBid: string;
  imageUrl: string;
  canBid: boolean = false;

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,
    private location: Location,
    private bidApi: BidsService,
    private actRoute: ActivatedRoute,
    private dialog: MatDialog,
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bidApi.getBid(id).valueChanges().subscribe(data => {
      const currentDate = new Date();

        if (currentDate.getTime() <= Date.parse(data['endsOn'])) {
          this.canBid = true;
        } else {
          this.canBid = false;
        }
        
        this.populateEditBidForm(data);
      });
  }

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
    this.updateBidForm();
  }

  confirmBidDialog() {
    let dialogRef = this.dialog.open(BidDialogComponent,
      {
        data: {
          action: "Bid",
          actionDescription: `bid $${this.editBidForm.get('highestBid').value} on ${this.editBidForm.get('name').value}`,
          confirmPhrase: "Place Bid"
        }
      });


    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.updateBid();
      }
    });

  }

  populateEditBidForm(data) {
    this.editBidForm.patchValue({
      name: data.name,
      description: data.description,
      endsOn: data.endsOn,
      highestBid: +data.highestBid,
      imageUrl: data.imageUrl,
      bidders: data.bidders,
      highestBidder: data.highestBidder
    });
    this.currentHighestBid = data.highestBid;
    this.imageUrl = data.imageUrl;
  }

  updateBidForm() {
    this.editBidForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      endsOn: ['', [Validators.required]],
      highestBid: [[null], [Validators.required, Validators.min(0)]],
      highestBidder: [''],
      highestBidderEmail: [''],
      imageUrl: ['', [Validators.required]],
      seller: [''],
      sellerEmail: [''],
      bidders: ['']
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.editBidForm.controls[controlName].hasError(errorName);
  }

  goBack() {
    this.location.back();
  }

  updateBid() {
    this.editBidForm.get('seller').setValue(this.user.displayName);
    this.editBidForm.get('sellerEmail').setValue(this.user.email);
    this.editBidForm.get('highestBidder').setValue(this.user.displayName);
    this.editBidForm.get('highestBidderEmail').setValue(this.user.email);
    this.editBidForm.get('bidders').setValue(
      new Array(...this.editBidForm.get('bidders').value, this.user.email)
    );

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bidApi.updateBid(id, this.editBidForm.value);
  }
}
