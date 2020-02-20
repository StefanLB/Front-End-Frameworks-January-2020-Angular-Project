import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatedBidsComponent } from './created-bids.component';

describe('CreatedBidsComponent', () => {
  let component: CreatedBidsComponent;
  let fixture: ComponentFixture<CreatedBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreatedBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatedBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
