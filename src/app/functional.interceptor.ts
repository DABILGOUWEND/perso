import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { catchError, throwError } from 'rxjs';

export const functionalInterceptor: HttpInterceptorFn = (req, next) => {
  const _auth = inject(Auth);
  console.log('rmfmfm')
  const user$ = user(_auth);
  req=req.clone({
    setHeaders: {
      Authorization: `Bearer ${user$}`
    }
  });
  return next(req).pipe(
    catchError((error) => {   
      debugger;
     if(error.status == 401) {
      confirm('You are not authorized to access this page');
     }
      return throwError(error);
    })  
  );
};
