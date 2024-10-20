import { TestBed } from '@angular/core/testing';

import { TelechargerService } from './telecharger.service';

describe('TelechargerService', () => {
  let service: TelechargerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TelechargerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
