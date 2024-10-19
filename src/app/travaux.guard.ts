import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';
import { AuthenService } from './authen.service';

export const travauxGuard: CanActivateFn = (route, state) => {
  const _service = inject(WenService);
  const _auth_service = inject(AuthenService);
  const router = inject(Router);
  if (_auth_service.userSignal() && (_auth_service.userSignal()?.role == "admin" ||_auth_service.userSignal()?.role == "user1")) {
    return true;
  } else {
    return false;
  }

};
