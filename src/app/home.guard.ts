import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { UserStore } from './store/appstore';
export const homeGuard: CanActivateFn = (route, state) => {
  const _autservice = inject(AuthenService);
  const router = inject(Router);

_autservice.user$.subscribe((resp:any)=>
  _autservice.state.set({user:resp})
);
console.log(_autservice.state());
  if (_autservice.Isconnected()) {
    return true
  }
  router.navigateByUrl('/login');
  return false;
};
