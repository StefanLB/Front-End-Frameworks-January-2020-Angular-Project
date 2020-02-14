import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBidComponent } from './delete-bid.component';

describe('DeleteBidComponent', () => {
  let component: DeleteBidComponent;
  let fixture: ComponentFixture<DeleteBidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteBidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteBidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
