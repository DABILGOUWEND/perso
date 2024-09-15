import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';

export const travauxGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const router = inject(Router);
  const role = _service.currentUserSignal()?.role;
  console.log(role)
  if (_service.currentUserSignal()) {
    if (role != 'admin') {
      if (role == 'user2') {
        return true;
      }
      else {
        return false;
        router.navigateByUrl('/login')
      }
    } else {
      return true;
    }
  } else {
    router.navigateByUrl('/login')
    return false
  }
};
