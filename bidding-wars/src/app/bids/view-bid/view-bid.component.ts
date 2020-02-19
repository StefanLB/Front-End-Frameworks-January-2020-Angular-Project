import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from '@angular/common';
import { BidsService } from '../bids.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthService } from 'src/app/auth/auth.service';

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

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,    
    private location: Location,
    private bidApi: BidsService,
    private actRoute: ActivatedRoute,
    private router: Router
  ) {
    var id = this.actRoute.snapshot.paramMap.get('id');
    this.bidApi.getBid(id).valueChanges().subscribe(data => {
      this.populateEditBidForm(data);
   })
  }

  ngOnInit() {
    this.auth.getUserState()
    .subscribe(user => {
     this.user = user;
    });
    this.updateBidForm();
  }

  populateEditBidForm(data){
    this.editBidForm.patchValue({
      name: data.name,
      description: data.description,
      endsOn: data.endsOn,
      highestBid: +data.highestBid,
      imageUrl: data.imageUrl
    });
    this.currentHighestBid = data.highestBid;
    this.imageUrl = data.imageUrl;
  }

  updateBidForm(){
    this.editBidForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      endsOn: ['', [Validators.required]],
      highestBid: [[null], [Validators.required, Validators.min(0)]],
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

  goBack(){
    this.location.back();
  }

  updateBid() {
    this.editBidForm.get('seller').setValue(this.user.displayName);
    this.editBidForm.get('sellerEmail').setValue(this.user.email);
    this.editBidForm.get('highestBidder').setValue(this.user.displayName);
    this.editBidForm.get('highestBidderEmail').setValue(this.user.email);

    var id = this.actRoute.snapshot.paramMap.get('id');
    if(window.confirm('Are you sure you want to place your bid?')){
        this.bidApi.updateBid(id, this.editBidForm.value);
    }
  }
}
