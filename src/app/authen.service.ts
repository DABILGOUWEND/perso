import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import { Users } from './models/modeles';
import { Router } from '@angular/router';
import { Auth, signOut, user } from '@angular/fire/auth';
import { Firestore } from '@angular/fire/firestore';
import { WenService } from './wen.service';
import { EntrepriseStore, UserStore } from './store/appstore';
import { getAuth } from 'firebase/auth';
import { Database } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
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
  _entreprise_store = inject(EntrepriseStore)
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
      this._http.put('https://mon-projet-35c49-default-rtdb.firebaseio.com/users/' + userId + '.json',
        {
          email: resp.email, 
          username: nom,
          role: role,
          entreprise_id: entreprise_id,
          projet_id:{...projet_id}
        }
      ).subscribe()
    }))
  };
  loginFirebase(email: string, password: string): Observable<any> {
    
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
      if (dataparse.expiretime && new Date(dataparse.expiretime) >= new Date()) {
        this.userSignal.set(dataparse);
      }
    }
  }
  handleCreateUser(user: any) {
    const expiresInTs = new Date().getTime() + user.expiresIn * 1000;
    const expireIn = expiresInTs;
    let new_user: Users = {
      uid: user.localId,
      email: user.email,
      token: user.idToken,
      expiretime: expireIn,
      role: '',
      entreprise_id: '',
      projet_id: [''],
      current_projet_id:''
    }
    this.userSignal.set(new_user);
    this._http.get('https://mon-projet-35c49-default-rtdb.firebaseio.com/users/' + user.localId + '.json').pipe(
      tap(
        (resp: any) => {
          this.userSignal.update(
            (user: any) => (
              {
                ...user,
                role: resp.role,
                entreprise_id: resp.entreprise_id,
                projet_id: resp.projet_id,
                current_projet_id:resp.projet_id[0]
              }
            )
          )
          localStorage.setItem('user', JSON.stringify(this.userSignal()));
        }
      )
    ).subscribe()
  }

}
