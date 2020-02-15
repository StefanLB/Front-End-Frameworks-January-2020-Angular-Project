import { Component, OnInit, ViewChild } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';
import { BidsService } from '../bids.service';
import { FormBuilder, FormGroup, FormControl, Validators, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-bid',
  templateUrl: './add-bid.component.html',
  styleUrls: ['./add-bid.component.scss']
})
export class AddBidComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  @ViewChild('chipList', {static: true}) chipList;
  @ViewChild('resetBookForm', {static: true}) myNgForm;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  selectedBindingType: string;

  public bidsForm: FormGroup;  // Define FormGroup to bid's form

  constructor(
    public fb: FormBuilder,       // Form Builder service for Reactive forms
    private bidApi: BidsService  // CRUD API services
  ) { }


  ngOnInit() {
    this.bidApi.getBidsList();  // Call GetStudentsList() before main form is being called
    this.bidForm();              // Call student form when component is ready
  }

  bidForm() {
    this.bidsForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      description: ['', [Validators.required, Validators.minLength(30)]],
      createdOn: [new Date(), [Validators.required]],
      endsOn: ['', [Validators.required]],
      highestBid: [null],
      highestBidder: [''],
      imageUrl: ['', [Validators.required]],
      seller: ['', [Validators.required]]
    })
  }

  public handleError = (controlName: string, errorName: string) => {
    return this.bidsForm.controls[controlName].hasError(errorName);
  }

  formatDate(e) {
    var convertDate = new Date(e.target.value).toISOString().substring(0, 10);
    this.bidsForm.get('publication_date').setValue(convertDate, {
      onlyself: true
    })
  }

  resetForm() {
    this.bidsForm.reset();
    Object.keys(this.bidsForm.controls).forEach(key => {
      this.bidsForm.controls[key].setErrors(null)
    });
  }

  submitBidData() {
    if (this.bidsForm.valid){
    this.bidApi.addBid(this.bidsForm.value);
    this.resetForm();
    }
  };
  
}
