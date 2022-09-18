import { TestBed } from '@angular/core/testing';

import { ReaderServiceService } from './reader-service.service';

describe('ReaderServiceService', () => {
  let service: ReaderServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReaderServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
