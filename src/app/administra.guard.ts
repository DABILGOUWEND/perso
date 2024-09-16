import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';
import { inject } from '@angular/core';

export const administraGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const router = inject(Router);
  const role = _service.currentUserSignal()?.role;
  if (_service.currentUserSignal()) {
    if (role != 'admin') {
      if (role == 'user1') {
        return true;
      }
      else {
        router.navigateByUrl('/login')
        return false;
      }
    } else {
      return true;
    }
  } else {
    router.navigateByUrl('/login')
    return false
  }
}
