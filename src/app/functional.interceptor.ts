import { HttpErrorResponse, HttpInterceptorFn, HttpParams, HttpHandler } from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, user } from '@angular/fire/auth';
import { catchError, throwError } from 'rxjs';

export const functionalInterceptor: HttpInterceptorFn = (req, next) => {
  let data = localStorage.getItem('user')
  console.log(data)
  if (data) {

    let myuser = JSON.parse(data)
    console.log(new Date(myuser.expiretime))
    return next(req.clone({

      headers: req.headers.set('Authorization', 'Bearer ' + myuser.token)
    }))
  }
  else {
    return next(req)
  }
};
