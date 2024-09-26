import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, catchError, from, map, switchMap, tap, timeout } from 'rxjs';
import { Users } from './models/modeles';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import { WendComponent } from './wend/wend.component';
import { WenService } from './wen.service';
import { UserStore } from './store/appstore';
import { get } from 'node:http';
import { getAuth, onAuthStateChanged, signInWithCredential } from 'firebase/auth';
import { Database, ref, set } from '@angular/fire/database';
import { child, getDatabase, onValue } from "firebase/database";
import { initializeApp } from 'firebase/app';
import { HttpClient } from '@angular/common/http';
import { response } from 'express';
import { JsonPipe } from '@angular/common';
import { environment } from '../environments/environment';
const apiKey = environment.firebaseConfig.apiKey;
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  constructor() {

  }

  router = inject(Router);
  _auth = inject(Auth);
  _http = inject(HttpClient);
  database = inject(Database);
  _firestore = inject(Firestore);
  _service = inject(WenService);
  _user_store = inject(UserStore);
  user$ = user(this._auth)

  loadings = signal(false);
  userSignal = signal<Users | undefined>(undefined);


  get_rt_database(): Observable<any> {
    return this._http.get('https://mon-projet-35c49-default-rtdb.firebaseio.com/users.json')
  }
  register(email: string, password: string, role: string, nom: string): Observable<any> {
    return this._http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey,
      {
        email: email,
        password: password
      }
    ).pipe(tap((resp: any) => {
      let userId = resp.localId;
      this._http.put('https://mon-projet-35c49-default-rtdb.firebaseio.com/users/' + userId + '.json',
        {
          email: resp.email,
          username: nom,
          role: role
        }
      ).subscribe()
    }))
  };
  loginFirebase(email: string, password: string): Observable<any> {
   // localStorage.removeItem('user');
    const auth = getAuth();
    this.loadings.set(true);
    return this._http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' + apiKey,
      {
        email: email,
        password: password,
        returnSecureToken: true
      }
    ).pipe(
      tap(resp =>
        this.handleCreateUser(resp)
      )
    )
  }
  logout(): Observable<any> {
    let promise = signOut(this._auth).then(() => {
      setTimeout(() => {
        localStorage.removeItem('token');
        this.router.navigateByUrl('/login');
      }, 2000);
    }
    );
    localStorage.removeItem('user');
    this.userSignal.set(undefined)
    return from(promise);
  }

  isloggedIn() {
    let uid = localStorage.getItem('token');
    return uid != null;
  }
  autoLogin() {
    let data = localStorage.getItem('user')
    if (data) {

      const dataparse = JSON.parse(data);
      if (dataparse.expiretime && new Date(dataparse.expiretime) >= new Date()) {
        this.userSignal.set(dataparse);
      }
    }
  }
  handleCreateUser(user: any) {
    this._http.get('https://mon-projet-35c49-default-rtdb.firebaseio.com/users/'+user.localId+'.json').subscribe(
      (resp:any)=>{
        console.log(resp);
        const expiresInTs = new Date().getTime() + user.expiresIn * 1000;
        const expireIn = expiresInTs;
        let new_user: Users = {
          uid: user.localId,
          email: user.email,
          token: user.idToken,
          expiretime: expireIn,
          role:resp.role
        }
        this.userSignal.set(new_user);
        localStorage.setItem('user', JSON.stringify(new_user));
      }
    
    )
   
  }

}
