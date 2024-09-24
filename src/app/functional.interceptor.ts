import { HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { catchError, throwError } from 'rxjs';

export const functionalInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    let reqtoken = req.clone({
      params: new HttpParams().set('auth', token)
    });
  
    return next(reqtoken);
  } else {
    return next(req);
  }
};
