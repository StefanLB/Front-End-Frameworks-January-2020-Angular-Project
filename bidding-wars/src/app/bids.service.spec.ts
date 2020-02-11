import { TestBed } from '@angular/core/testing';

import { BidsService } from './bids.service';

describe('BidsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BidsService = TestBed.get(BidsService);
    expect(service).toBeTruthy();
  });
});
