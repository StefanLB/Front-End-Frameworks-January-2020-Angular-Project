import { Component, OnInit } from '@angular/core';
import { BidsService } from '../bids.service';    // CRUD services API
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'; // Reactive form services

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.scss']
})
export class AddBidComponent implements OnInit {
  public bidsForm: FormGroup;  // Define FormGroup to bid's form

  constructor(
    public crudApi: BidsService,  // CRUD API services
    public fb: FormBuilder,       // Form Builder service for Reactive forms
  ) { }


  ngOnInit() {
    this.crudApi.getBidsList();  // Call GetStudentsList() before main form is being called
    this.bidForm();              // Call student form when component is ready
  }

  bidForm() {
    this.bidsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      createdOn: ['', [Validators.required]],
      endsOn: ['', [Validators.required]],
      highestBid: [null],
      imageUrl: ['', [Validators.required]],
      seller: ['', [Validators.required]]
    })
  }

  get name() {
    return this.bidsForm.get('name');
  }

  get description() {
    return this.bidsForm.get('description');
  }

  get createdOn() {
    return this.bidsForm.get('createdOn');
  }

  get endsOn() {
    return this.bidsForm.get('endsOn');
  }

  get highestBid() {
    return this.bidsForm.get('highestBid');
  }

  get imageUrl() {
    return this.bidsForm.get('imageUrl');
  }

  get seller() {
    return this.bidsForm.get('seller');
  }

  ResetForm() {
    this.bidsForm.reset();
  }

  submitBidData() {
    this.crudApi.addBid(this.bidsForm.value); // Submit student data using CRUD API
    this.ResetForm();  // Reset form when clicked on reset button
  };
}
