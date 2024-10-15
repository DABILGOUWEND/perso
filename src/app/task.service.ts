import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { AuthenService } from './authen.service';
import { forkJoin, from, map, Observable, of, switchMap, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, getDoc, setDoc } from '@angular/fire/firestore';
import { appro_gasoil, classe_engins, Engins, Gasoil, Pannes, Projet, tab_personnel, tab_ProjetStore, taches_engins } from './models/modeles';
import { UserStore, EntrepriseStore, GasoilStore, ApproGasoilStore, EnginsStore, PannesStore, ProjetStore, ClasseEnginsStore } from './store/appstore';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _http = inject(HttpClient);

  db: Firestore = inject(Firestore);
  _auth_service = inject(AuthenService);


  //engins
  getallEngins(): Observable<Engins[]> {
    if (!environment.production) {
      return this._http.get<any[]>(this._auth_service.lodal_apiUrl()).pipe(map((resp:any) => resp.engins.map((x:any) => {
        return {
          id: x.id.toString(),
          designation: x.designation,
          code_parc: x.code_parc,
          immatriculation: x.immatriculation,
          utilisateur_id: x.utilisateur_id,
          classe_id: x.classe_id.toString(),
        }
      }
      )
      )
      )
    }
    else {
      const Collection = collection(this.db, 'comptes/' +
        this._auth_service.current_projet_id() + '/engins');
      return collectionData(Collection, { idField: 'id' }) as Observable<Engins[]>
    }

  }
  addEngins(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      '' + '/engins');
    const docRef = addDoc(EnginsCollection, data).then(response => response.id)
    return from(docRef)
  }
  updateEngins(data: any): Observable<void> {
    let mydata = {
      designation: data.designation,
      code_parc: data.code_parc,
      immatriculation: data.immatriculation,
      classe_id: data.classe_id,
      utilisateur_id: data.utilisateur_id,
    }
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '""' + '/engins/' + id);
    const promise = setDoc(docRef, mydata)
    return from(promise)
  }
  deleteEngins(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/engins/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //personnel
  getallPersonnel(): Observable<tab_personnel[]> {
    if (!environment.production) {
      return this._http.get<any[]>(this._auth_service.lodal_apiUrl()).pipe(
        map((resp:any) => resp.personnel.map((x:any) => {
          return {
            id: x.id.toString(),
            nom: x.nom,
            prenom: x.prenom,
            fonction: x.fonction,
            num_phone1: x.num_phone1,
            num_phone2: x.num_phone2,
            email:x.email,
            num_matricule: x.num_matricule,
            dates: [],
            heuresN: [],
            heureSup: [],
            presence: [],
            statut_id: ""
          }
        }))
      )
    } else {
    const Collection = collection(this.db, 'comptes/' 
      +
      this._auth_service.current_projet_id() + '/personnel');
    return collectionData(Collection, { idField: 'id' }) as Observable<tab_personnel[]>
    }
  }
  addPersonnel(data: any): Observable<string> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.current_projet_id() + '/personnel');
    const docRef = addDoc(Collection, data).then(response => response.id)
    return from(docRef)
  }
  updatePersonnel(data: any): Observable<any> {
    let mydata = {
      nom: data.nom,
      prenom: data.prenom,
      num_phone1: data.num_phone1,
      num_phone2: data.num_phone2,
      email: data.email,
      fonction: data.fonction,
      num_matricule: data.num_matricule,
      statut_id: data.statut_id,
      presence: data.presence

    };
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '' + '/personnel/' + id);
    const promise = setDoc(docRef, mydata)
    return from(promise)
  }
  deletePersonnel(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/personnel/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }
  //classes_engins
  getallClassesEngins(): Observable<classe_engins[]> {
    if (!environment.production) {
      return this._http.get<any[]>(this._auth_service.lodal_apiUrl()).pipe(
        map((resp:any) => resp.classes_engins.map((x:any) => {
          return {
            id: x.id.toString(),
            designation: x.designation,
            taches: []
          }
        }))
      )
    } else {
      const Collection = collection(this.db, 'comptes/' +
        this._auth_service.current_projet_id() + '/classes_engins');
      return collectionData(Collection, { idField: 'id' }) as Observable<classe_engins[]>
    }

  }
  addClassesEngins(data: any): Observable<string> {

    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.current_projet_id() + '/classes_engins');
    const docRef = addDoc(Collection, data).then(response => response.id)
    return from(docRef)
  }
  updateClassesEngins(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '' + '/classes_engins/' + id);
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteClassesEngins(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/classes_engins/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //projets
  getallProjets(): Observable<Projet[]> {
    if (!environment.production) {
      return this._http.get<Projet[]>('http://localhost:3000/projets').pipe(
        map((resp) => resp.map((x:any) => {
          return {
            id: x.id.toString(),
            code: x.code,
            intitule: x.intitule,
            maitre_ouvrage_id: x.maitre_oeuvre_id,
            maitre_oeuvre_id: x.maitre_oeuvre_id,
            entreprise_id: x.entreprise_id,
            bailleur_id: x.bailleur_id,
            date_debut: "",
            duree: 0
          }
        }))
      )
    } else {
      const Collection = collection(this.db, 'projet');
      return collectionData(Collection, { idField: 'id' }) as Observable<Projet[]>
    }

  }
  addProjets(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.current_projet_id() + '/projet');
    const docRef = addDoc(EnginsCollection, data).then
      (response =>
        response.id
      )
    return from(docRef)
  }
  updateProjets(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '' + '/projet');
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteProjets(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/projet/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //gasoil
  getallConsogo(): Observable<Gasoil[]> {
    if (!environment.production) {
      return this._http.get<any[]>(this._auth_service.lodal_apiUrl()).pipe(
        map((resp:any) => resp.conso_go.map((x:any) => {
          return {
            id: x.id.toString(),
            engin_id: x.engin_id.toString(),
            compteur: x.compteur,
            quantite_go: x.quantite_go,
            date: x.date,
            diff_work: x.diff_work,
            numero: x.numero
          }
        }))
      )
    } else {
      const mycollection = collection(this.db, 'comptes/' +
        this._auth_service.current_projet_id() + '/conso_gasoil')
      let donnees = collectionData(mycollection, { idField: 'id' }) as Observable<Gasoil[]>
      return donnees
    }
  }
  addConsogo(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      '' + '/conso_gasoil');
    const docRef = addDoc(EnginsCollection, data).then(response => response.id)
    return from(docRef)
  }
  updateConsogo(data: any): Observable<void> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '' + '/conso_gasoil/' + id)
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteConsogo(id: string): Observable<void> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/conso_gasoil/' + id)
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //appro gasoil
  getAllApproGo(): Observable<appro_gasoil[]> {
    if (!environment.production) {
      return this._http.get<any[]>(this._auth_service.lodal_apiUrl()).pipe(
        map((resp:any) => resp.appro_go.map((x:any) => {
          return {
            id: x.id.toString(),
            date: x.date,
            quantite: x.quantite,
            reception: x.reception
          }
        }))
      )
    } else {
      const mycollection = collection(this.db, 'comptes/' +
        this._auth_service.current_projet_id() + '/appro_go')
      let donnees = collectionData(mycollection, { idField: 'id' }) as Observable<appro_gasoil[]>
      return donnees
    }
  }
  addApproGo(data: any): Observable<string> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.current_projet_id() + '/appro_go');
    const docRef = addDoc(Collection, data).then(response => response.id)
    return from(docRef)
  }
  updateApproGo(data: any): Observable<void> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '' + '/appro_go/' + id)
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteApproGo(id: string): Observable<void> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/appro_go/' + id)
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //pannes
  getAllPannes(): Observable<Pannes[]> {
    if (!environment.production) {
      return this._http.get<any[]>(this._auth_service.lodal_apiUrl()).pipe(
        map((resp:any) => resp.pannes.map((x:any) => {
          return {
            id: x.id.toString(),
            engin_id: x.engin_id,
            debut_panne: x.debut_panne,
            fin_panne: x.fin_panne?x.fin_panne:"",
            heure_debut: x.heure_debut,
            heure_fin: x.heure_fin?x.heure_fin:"",
            motif_panne: x.motif_panne,
            situation: x.situation
          }
        }))
      )
    }else{
      const mycollection = collection(this.db, 'comptes/' +
        this._auth_service.current_projet_id() + '/pannes')
      let donnees = collectionData(mycollection, { idField: 'id' }) as Observable<Pannes[]>
      return donnees
    }
  
  }
  addpannes(data: any): Observable<string> {
      const EnginsCollection = collection(this.db, 'comptes/' +
        this._auth_service.current_projet_id() + '/pannes');
      const docRef = addDoc(EnginsCollection, data).then(response => response.id)
      return from(docRef)
  }
  updatePannes(data: any): Observable<void> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      '' + '/pannes/' + id)
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deletePannes(id: string): Observable<void> {
    const docRef = doc(this.db, 'comptes/' +
      '' + '/pannes/' + id)
    const promise = deleteDoc(docRef)
    return from(promise)
  }
  getallUsersByUid(uid: string): Observable<any> {
    const docRef = doc(this.db, "myusers", uid);
    const docSnap = getDoc(docRef);
    return from(docSnap)
  }

  loadEnginsJson(): Observable<any> {
    
    return this._http.get<any>(this._auth_service.lodal_apiUrl()).pipe(tap(resp => console.log(resp.conso_go))
    )
  }
}
