import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, from, map, switchMap, tap, timeout } from 'rxjs';
import { Users } from './models/modeles';
import { Router } from '@angular/router';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, updateProfile, user } from '@angular/fire/auth';
import { collection, addDoc, Firestore } from '@angular/fire/firestore';
import { WendComponent } from './wend/wend.component';
import { WenService } from './wen.service';
import { UserStore } from './store/appstore';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { get } from 'node:http';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { on } from 'node:events';
import { time } from 'node:console';
import { sign } from 'node:crypto';

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  constructor() {
  }



  router = inject(Router);
  _auth = inject(Auth);

  firestore = inject(Firestore);
  _service = inject(WenService);
  _user_store = inject(UserStore);
  user_uid = signal<string | null>(null);
  isloggedIn = computed(() => {
    let uid=localStorage.getItem('user_uid');
    return  uid!= null;
  }
  );
  loadings = signal(false);

  register(email: string, password: string, role: string, nom: string): Observable<any> {
    let promise = createUserWithEmailAndPassword(
      this._auth,
      email,
      password).then(response => {
        let user = {
          uid: response.user.uid,
          email: response.user.email,
          role: role,
          nom: nom
        };
        const this_collection = collection(this.firestore, 'myusers')
        const docRef = addDoc(this_collection, user).then
          (response =>
            response.id
          )
        from(docRef).subscribe();
        updateProfile(response.user, {
          displayName: email,
        })
      }
      );
    return from(promise);
  };
  loginFirebase(email: string, password: string): Observable<any> {
    const auth = getAuth();
    this.loadings.set(true);
    let promise = signInWithEmailAndPassword(auth,
      email,
      password).then((user) => {
        let filtre = this._user_store.users().find(x => x.uid == user.user.uid);
        let role = filtre == undefined ? '' : filtre.role;
        localStorage.setItem('user_uid', JSON.stringify(user.user.uid));
        localStorage.setItem('role', JSON.stringify(role));
        this.user_uid.set(user.user.uid);

      })
      .catch((error) => {
      });
    return from(promise);
  }
  logout(): Observable<any> {
    let promise = signOut(this._auth).then(() => {
      setTimeout(() => {
        this.router.navigateByUrl('/login');
      }, 2000);
    }
    );
    localStorage.removeItem('user_uid');
    localStorage.removeItem('role');
    this.loadings.set(false);
    return from(promise);
  }
}
