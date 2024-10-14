import { Inject, Injectable, PLATFORM_ID, computed, effect, inject, signal } from '@angular/core';
import { Observable, from, tap } from 'rxjs';
import { Users } from './models/modeles';
import { Router } from '@angular/router';
import { Auth, signInWithEmailAndPassword, signOut, user } from '@angular/fire/auth';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { WenService } from './wen.service';
import { ApproGasoilStore, ClasseEnginsStore, EnginsStore, EntrepriseStore, GasoilStore, PannesStore, ProjetStore, UserStore } from './store/appstore';
import { browserLocalPersistence, browserSessionPersistence, getAuth, setPersistence, signInWithCustomToken } from 'firebase/auth';
import { Database } from '@angular/fire/database';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment';
import { and, doc, getDoc } from 'firebase/firestore';
import { sign } from 'node:crypto';
import { isPlatformBrowser, NumberSymbol } from '@angular/common';
const apiKey = environment.firebaseConfig.apiKey;
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  constructor() {
    this.isBrowser = isPlatformBrowser(this.platformId)
  }
  platformId=inject(PLATFORM_ID)
  isBrowser :boolean;
  router = inject(Router);
  _auth = inject(Auth);
  _http = inject(HttpClient);
  database = inject(Database);
  _firestore = inject(Firestore);
  _service = inject(WenService);
  _user_store = inject(UserStore);
  _entreprise_store = inject(EntrepriseStore);
  _gasoil_store=inject(GasoilStore);
  _approgo_store=inject(ApproGasoilStore);
  _engins_store=inject(EnginsStore);
  _pannes_store=inject(PannesStore);
  _projet_store=inject(ProjetStore);
  _classes_store=inject(ClasseEnginsStore);
  db: Firestore = inject(Firestore);
  token = signal('');
  user$ = user(this._auth);
  loadings = signal(false);
  userSignal = signal<Users | undefined>(undefined);
  affichage=signal<string|null|undefined>('')
  current_projet_id=signal<string|undefined>(undefined);
  list_projet=signal<string[]>([])

/*   ef=effect(()=>{
    let rep=this.current_projet_id();
    if(rep)
    {
      this._engins_store.loadengins(rep);
      this._gasoil_store.loadconso(rep);
      this._approgo_store.loadappro(rep);
      this._pannes_store.loadPannes(rep);
      this._classes_store.loadclasses(rep);
    }
  }) */



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
          this.affichage.set(user.email)
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
        localStorage.removeItem('user');
        this.userSignal.set(undefined);
        this.current_projet_id.set(undefined);
      }, 2000);
    }
    );
 
    return from(promise);
  }

  isloggedIn() {
    let uid = localStorage.getItem('token');
    return uid != null;
  }
  autoLogin() {
    if(this.isBrowser)
    {
      let data = localStorage.getItem('user');
      if (data) {
       const dataparse = JSON.parse(data);
       this.userSignal.set(dataparse);
       this.current_projet_id.set(this.userSignal()?.current_projet_id);
     } 
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
      this.getallUsersByUid(user.uid).pipe(
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
            this.current_projet_id.set(data.projet_id[0]);
          }
        )
      ).subscribe()
    }

    projets=computed(()=>{
      let user= this.userSignal();
      if(user)
      {
        let rep=this._projet_store.donnees_projet().filter(x=>user.projet_id.includes(x.id));
        return rep.map(x=>{
          return {
            'id':x.id,
            'intitule':x.intitule
          }
        })
      }else
      {
        return []
      }
    })
    
    getallUsersByUid(uid: string): Observable<any> {
      const docRef = doc(this.db, "myusers", uid);
      const docSnap = getDoc(docRef);
      return from(docSnap)
    }

}
