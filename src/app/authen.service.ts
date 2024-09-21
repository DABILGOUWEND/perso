import { Injectable, computed, effect, inject, signal } from '@angular/core';
import { BehaviorSubject, Observable, from } from 'rxjs';
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

@Injectable({
  providedIn: 'root'
})
export class AuthenService {

  
  isloggedIn: boolean = false;
  router = inject(Router);
  _auth = inject(Auth);
  user$ = user(this._auth);
  firestore = inject(Firestore);
  _service=inject(WenService);
  _user_store=inject(UserStore);

  userStatus='';
  userstatusChanges=signal<string>('');
  currentUserSignal = signal<Users | undefined | null>(undefined);
  is_connected = signal<Users | undefined | null>(undefined);
  Isconnected=signal<boolean>(false);
  myuser:BehaviorSubject<Users|undefined> = new BehaviorSubject<Users|undefined>({} as Users);

  user=computed(() => {
    console.log(this.state())
    return this.state().user})
  state=signal<any>({
    user:undefined
  })

  constructor() {
    this.user$.subscribe((user:any) => {
      this.state.set({user: user})
    })
  }

  setUserStatus(status:string)
  {
    this.userStatus=status;
    this.userstatusChanges.set(status);
  }
  register(email: string, password: string,role:string,nom:string): Observable<any> {
    let promise = createUserWithEmailAndPassword(
      this._auth,
      email,
      password).then(response => {
        let user = {
          uid: response.user.uid,
          email: response.user.email,
          role:role,
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
    const auth=getAuth();
    let promise = signInWithEmailAndPassword(auth,
      email,
      password).then((user) => {
        console.log(user.user)
         this.Isconnected.set(true)
      })
    return from(promise);
  }

  /*  login(name: string, password: string): Observable<boolean> {
     let users = this.user_store.users()
     let identifiants = users.map(x => x.identifiant)
     let motdepasses = users.map(x => x.mot_de_passe)
     let niveau = users.map(x => x.niveau)
     let ind = identifiants.indexOf(name, 0)
     let isloggedIn = false
     let is_connect = undefined
     if (ind == -1) {
       isloggedIn = false
     }
     else {
       if (motdepasses[ind] == password) {
         if(niveau[ind]==this.user_store.getNivo() || niveau[ind]==3)
         {
           isloggedIn = true
           is_connect = {
             id: '',
             identifiant: name,
             mot_de_passe: password,
             niveau: niveau[ind]
           }
         }
         else
         {
           this.user_store.setNivo(niveau[ind])
           this.user_store.setUrl('/accueil')
           isloggedIn = true
           is_connect = {
             id: '',
             identifiant: name,
             mot_de_passe: password,
             niveau: niveau[ind]
           }
         }
           
 
       }
       else {
         isloggedIn = false
       }
     }
     return of(isloggedIn).pipe(
       delay(1000),
       tap(isloggedIn => {
         this.isloggedIn = isloggedIn;
         this.is_connected.set(is_connect)
       }
       )
     )
   } */

  logout(): Observable<any> {
    let promise = signOut(this._auth);
    return from(promise);
  }

}
