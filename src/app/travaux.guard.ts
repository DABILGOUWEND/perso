import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';

export const travauxGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const router = inject(Router);
  return true;
};
