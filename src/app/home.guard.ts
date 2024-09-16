import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';
import { UserStore } from './store/appstore';

export const homeGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const router = inject(Router);
  const _user_store = inject(UserStore);
  console.log(_user_store.users())
  const role = _service.currentUserSignal()?.role;

  let response = _service.currentUserSignal() != undefined
  if(!response){
    router.navigateByUrl('/login');
  }
  return response
};
