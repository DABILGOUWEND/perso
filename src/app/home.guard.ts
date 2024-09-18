import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';
import { UserStore } from './store/appstore';
import { AuthenService } from './authen.service';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { AsyncPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
export const homeGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const _autservice = inject(AuthenService);
  const router = inject(Router);
  if (_autservice.user()) {
    return true
  }
  router.navigateByUrl('/login');
  return false;
};
