import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBidComponent } from './edit-bid.component';

describe('EditBidComponent', () => {
  let component: EditBidComponent;
  let fixture: ComponentFixture<EditBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
