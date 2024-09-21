import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { UserStore } from './store/appstore';
export const homeGuard: CanActivateFn = (route, state) => {
  const _autservice = inject(AuthenService);
  const _userstore = inject(UserStore);
  let role = localStorage.getItem('role');
  let uid = localStorage.getItem('uid');
  const router = inject(Router);
  if (uid!=null) {
    return true
  }
  router.navigateByUrl('/login');
  return false;
};
