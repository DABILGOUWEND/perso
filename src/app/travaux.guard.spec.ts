import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { travauxGuard } from './travaux.guard';

describe('travauxGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => travauxGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
