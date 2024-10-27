import { TestBed } from '@angular/core/testing';

import { ComptesDateInitService } from './comptes-date-init.service';

describe('ComptesDateInitService', () => {
  let service: ComptesDateInitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ComptesDateInitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
