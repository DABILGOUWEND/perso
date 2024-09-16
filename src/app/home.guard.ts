import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';

export const homeGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const router = inject(Router);
  const role = _service.currentUserSignal()?.role;
  if (_service.currentUserSignal()!=undefined ) {  
    return true
  } else {
    router.navigateByUrl('/login')
    return false
  }
};
