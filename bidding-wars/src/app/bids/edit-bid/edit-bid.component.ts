import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { BidsService } from '../bids.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';
import { MatDialog } from '@angular/material/dialog';
import { BidDialogComponent } from '../bid-dialog/bid-dialog.component';


@Component({
  selector: 'app-edit-bid',
  templateUrl: './edit-bid.component.html',
  styleUrls: ['./edit-bid.component.scss']
})
export class EditBidComponent implements OnInit {
  minDate = new Date();
  user: firebase.User;
  editBidForm: FormGroup;

  ngOnInit() {
    this.auth.getUserState()
      .subscribe(user => {
        this.user = user;
      });
    this.updateBidForm();
  }

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,
    private location: Location,
    private bidApi: BidsService,
    private actRoute: ActivatedRoute,
    private router: Router,
    private dialog: MatDialog
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bidApi.getBid(id).valueChanges().subscribe(data => {
      this.populateEditBidForm(data);
    })
  }

  populateEditBidForm(data) {
    this.editBidForm.patchValue({
      name: data.name,
      description: data.description,
      endsOn: data.endsOn,
      highestBid: +data.highestBid,
      imageUrl: data.imageUrl
    });
  }

  updateBidForm() {
    this.editBidForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      endsOn: ['', [Validators.required]],
      highestBid: [[null], [Validators.required]],
      highestBidder: [''],
      highestBidderEmail: [''],
      imageUrl: ['', [Validators.required]],
      seller: [''],
      sellerEmail: ['']
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.editBidForm.controls[controlName].hasError(errorName);
  }

  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.editBidForm.get('endsOn').setValue(convertDate, {
      onlyself: true
    })
  }

  goBack() {
    this.location.back();
  }

  updateBidDialog() {
    let dialogRef = this.dialog.open(BidDialogComponent,
      {
        data: {
          action: "Update",
          actionDescription: `update bid ${this.editBidForm.get('name').value}`,
          confirmPhrase: "Update Bid"
        }
      });


    dialogRef.afterClosed().subscribe(result => {
      if (result == "true") {
        this.updateBid();
      }
    });

  }

  updateBid() {
    this.editBidForm.get('seller').setValue(this.user.displayName);
    this.editBidForm.get('sellerEmail').setValue(this.user.email);
    this.editBidForm.get('highestBidder').setValue(this.user.displayName);
    this.editBidForm.get('highestBidderEmail').setValue(this.user.email);

    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bidApi.updateNewBid(id, this.editBidForm.value);
  }
}
