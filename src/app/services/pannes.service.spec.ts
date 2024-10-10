import { TestBed } from '@angular/core/testing';

import { PannesService } from './pannes.service';

describe('PannesService', () => {
  let service: PannesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PannesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
