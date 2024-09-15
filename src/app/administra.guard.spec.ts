import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { administraGuard } from './administra.guard';

describe('administraGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => administraGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
