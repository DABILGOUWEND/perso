import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { WenService } from './wen.service';
import { AuthenService } from './authen.service';

export const travauxGuard: CanActivateFn = (route, state) => {
  const _auth_service = inject(AuthenService);
  if (_auth_service.userSignal() && (_auth_service.userSignal()?.role == "admin" ||_auth_service.userSignal()?.role == "user2")) {
    return true;
  } else {
    //alert('Vous n\'avez pas les droits pour accéder à cette page');
    return false;
  }

};
