import { Component, OnInit, ViewChild } from '@angular/core';
import { BidsService } from '../bids.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.scss']
})
export class AddBidComponent implements OnInit {
  minDate = new Date();
  user: firebase.User;

  @ViewChild('resetBidForm', {static: false}) myNgForm;

  bidsForm: FormGroup;

  constructor(
    private auth: AuthService,
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private bidApi: BidsService  // CRUD API services
  ) { }

  ngOnInit() {
    this.auth.getUserState()
    .subscribe(user => {
      console.log(user);
     this.user = user;
    });
    this.bidApi.getBidsList();  // Call GetStudentsList() before main form is being called
    this.bidForm();              // Call student form when component is ready
  }

  bidForm() {
    this.bidsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      createdOn: [new Date().toISOString().substring(0, 10)],
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
    return this.bidsForm.controls[controlName].hasError(errorName);
  }

  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.bidsForm.get('endsOn').setValue(convertDate, {
      onlyself: true
    })
  }

  resetForm() {
    this.bidsForm.reset();
  }

  submitBidData() {
    this.bidsForm.get('seller').setValue(this.user.displayName);
    this.bidsForm.get('sellerEmail').setValue(this.user.email);
    this.bidsForm.get('highestBidder').setValue(this.user.displayName);
    this.bidsForm.get('highestBidderEmail').setValue(this.user.email);

    if (this.bidsForm.valid){
    this.bidApi.addBid(this.bidsForm.value);
    this.resetForm();
    }
  };
  
}
