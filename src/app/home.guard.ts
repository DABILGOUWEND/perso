import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { UserStore } from './store/appstore';
export const homeGuard: CanActivateFn = (route, state) => {
  const _autservice = inject(AuthenService);
  console.log(_autservice.isloggedIn());
  const router = inject(Router);
  if (_autservice.isloggedIn()) {
    return true
  }
  router.navigateByUrl('/login');
  return false;
};
