import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import { Users } from './models/modeles';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { WenService } from './wen.service';
import { EntrepriseStore, UserStore } from './store/appstore';
import { browserLocalPersistence, browserSessionPersistence, getAuth, setPersistence, signInWithCustomToken } from 'firebase/auth';
import { Database } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { and } from 'firebase/firestore';
import { sign } from 'node:crypto';
import { NumberSymbol } from '@angular/common';
const apiKey = environment.firebaseConfig.apiKey;
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  router = inject(Router);
  _auth = inject(Auth);
  _http = inject(HttpClient);
  database = inject(Database);
  _firestore = inject(Firestore);
  _service = inject(WenService);
  _user_store = inject(UserStore);
  _entreprise_store = inject(EntrepriseStore);
  token = signal('');
  user$ = user(this._auth);
  url_entreprise = computed(() => {
    let entreprise = this._entreprise_store.donnees_entreprise().find(x => x.id == this.userSignal()?.entreprise_id);
    return 'https://mon-projet-35c49-default-rtdb.firebaseio.com/' + entreprise?.enseigne + '/'
  })

  loadings = signal(false);
  userSignal = signal<Users | undefined>(undefined);
  get_rt_database(): Observable<any> {
    return this._http.get('https://mon-projet-35c49-default-rtdb.firebaseio.com/users.json')
  }
  register(email: string, password: string, role: string, nom: string, entreprise_id: string, projet_id: string[]): Observable<any> {
    return this._http.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' + apiKey,
      {
        email: email,
        password: password
      }
    ).pipe(tap((resp: any) => {
      let userId = resp.localId;
      let data = {
        id: userId,
        email: resp.email,
        username: nom,
        role: role,
        entreprise_id: entreprise_id,
        projet_id: projet_id
      }
      this._service.addUser(data).subscribe()
    }))
  };
  loginFirebase(email: string, password: string): Observable<any> {
    this.loadings.set(true);
    const auth = getAuth();
    return from(this._auth.setPersistence(browserSessionPersistence).then(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.handleCreateUser(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        })
    }))
  }
  logout(): Observable<any> {
    let promise = signOut(this._auth).then(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
    }
    );
    localStorage.removeItem('user');
    this.userSignal.set(undefined);
    return from(promise);
  }

  isloggedIn() {
    let uid = localStorage.getItem('token');
    return uid != null;
  }
  autoLogin() {
    let data = localStorage.getItem('user');
    if (data) {
      const dataparse = JSON.parse(data);
      this.userSignal.set(dataparse);
    }
  }
  handleCreateUser(user: any) {
    let new_user: Users = {
      uid: user.uid,
      email: user.email,
      token: this.token(),
      role: '',
      entreprise_id: '',
      projet_id: [''],
      current_projet_id: ''
    }
    this.userSignal.set(new_user);
    localStorage.setItem('user', JSON.stringify(this.userSignal()));
    this._service.getallUsersByUid(user.uid).pipe(
      tap(
        (resp: any) => {
          let data= resp.data();
          this.userSignal.update(
            (user: any) =>
            (
              {
                ...user,
                'role': data.role,
                'entreprise_id': data.entreprise_id,
                'projet_id': data.projet_id,
                'current_projet_id': data.projet_id[0]
              }
            )
          )
          localStorage.setItem('user', JSON.stringify(this.userSignal()));
        }
      )
    ).subscribe()
  }

}
