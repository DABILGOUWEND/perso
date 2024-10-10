import { TestBed } from '@angular/core/testing';

import { GasoilService } from './gasoil.service';

describe('GasoilService', () => {
  let service: GasoilService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GasoilService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
