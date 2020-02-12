import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBidComponent } from './add-bid.component';

describe('AddBidComponent', () => {
  let component: AddBidComponent;
  let fixture: ComponentFixture<AddBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
