import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthenService } from './authen.service';
import { UserStore } from './store/appstore';
import { toSignal } from '@angular/core/rxjs-interop';
import { getDatabase, onValue, ref } from 'firebase/database';
import { getAuth } from 'firebase/auth';
export const homeGuard: CanActivateFn = (route, state) => {
  const _autservice = inject(AuthenService);
  const router = inject(Router);
  if (_autservice.userSignal()) {
    return true;
  }
  else {
    router.navigateByUrl('/login');
    return false;
  }

};
