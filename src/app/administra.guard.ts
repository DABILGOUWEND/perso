import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';
import { inject } from '@angular/core';

export const administraGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const router = inject(Router);
  return true

}
