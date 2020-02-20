import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlacedBidsComponent } from './placed-bids.component';

describe('PlacedBidsComponent', () => {
  let component: PlacedBidsComponent;
  let fixture: ComponentFixture<PlacedBidsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlacedBidsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlacedBidsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
