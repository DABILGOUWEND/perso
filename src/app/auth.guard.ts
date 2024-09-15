import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { UserStore } from './store/appstore';
import { WenService } from './wen.service';

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthenService);
  const router = inject(Router);
  const user_store = inject(UserStore)
  const _service = inject(WenService);
  if (_service.currentUserSignal() != undefined) {
    return true
  }
  else {
    router.navigateByUrl('/login')
    return false
  }
};
