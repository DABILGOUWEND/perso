import { inject, Injectable, signal } from '@angular/core';
import { AuthenService } from './authen.service';
import { from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { appro_gasoil, classe_engins, Engins, Gasoil, Projet, tab_personnel, tab_ProjetStore } from './models/modeles';
import { response } from 'express';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _http = inject(HttpClient);
  _auth_service = inject(AuthenService);
  db: Firestore = inject(Firestore);

  //engins
  getallEngins(): Observable<Engins[]> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/engins');
    return collectionData(Collection, { idField: 'id' }) as Observable<Engins[]>
  }
  addEngins(data: any): Observable<void> {
    let mydata = {
      "designation": data.designation,
      "code_parc": data.code_parc,
      "classe_id": data.classe_id,
      "utilisateur_id": data.utilisateur_id,
      "immatriculation": data.immatriculation
    }
    const EnginsCollection = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/engins/' + data.id);
    const docRef = setDoc(EnginsCollection, mydata)
    return from(docRef)
  }
  updateEngins(data: any): Observable<void> {
    let mydata = {
      designation: data.designation,
      code_parc: data.code_parc,
      immatriculation: data.immatriculation,
      classe_id: data.classe_id,
      utilisateur_id: data.utilisateur_id,
      pannes: data.pannes,
      gasoil: data.gasoil
    }
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/engins/' + id);
    const promise = setDoc(docRef, mydata)
    return from(promise)
  }
  deleteEngins(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/engins/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //personnel
  getallPersonnel(): Observable<tab_personnel[]> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/personnel');
    return collectionData(Collection, { idField: 'id' }) as Observable<tab_personnel[]>
  }
  addPersonnel(data: any): Observable<string> {


    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/personnel');
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
      this._auth_service.userSignal()?.current_projet_id + '/personnel/' + id);
    const promise = setDoc(docRef, mydata)
    return from(promise)
  }
  deletePersonnel(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/personnel/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }
  //
  //classes_engins
  getallClassesEngins(): Observable<classe_engins[]> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins');
    return collectionData(Collection, { idField: 'id' }) as Observable<classe_engins[]>
  }
  addClassesEngins(data: any): Observable<string> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins');
    const docRef = addDoc(Collection, data).then(
      response => response.id
    )
    return from(docRef)
  }
  updateClassesEngins(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins/' + id);
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteClassesEngins(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //projets
  getallProjets(): Observable<Projet[]> {
    const Collection = collection(this.db, 'projet');
    return collectionData(Collection, { idField: 'id' }) as Observable<Projet[]>
  }
  addProjets(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/projet');
    const docRef = addDoc(EnginsCollection, data).then
      (response =>
        response.id
      )
    return from(docRef)
  }
  updateProjets(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/projet');
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteProjets(id: string): Observable<any> {
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/projet/' + id);
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //gasoil
  getallConsogo(): Observable<Gasoil[]> {
    const mycollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/conso_go')
    let donnees = collectionData(mycollection, { idField: 'id' }) as Observable<Gasoil[]>
    return donnees
  }
  addConsogo(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/conso_go');
    const docRef = addDoc(EnginsCollection, data).then(response => response.id)
    return from(docRef)
  }
  updateConsogo(data: any): Observable<void> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/conso_go/' + id)
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteConsogo(id: string): Observable<void> {
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/conso_go/' + id)
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //appro gasoil
  getAllApproGo(): Observable<appro_gasoil[]> {
    const mycollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/appro_go')
    let donnees = collectionData(mycollection, { idField: 'id' }) as Observable<appro_gasoil[]>
    return donnees
  }
  addApproGo(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/appro_go');
    const docRef = addDoc(EnginsCollection, data).then(response => response.id)
    return from(docRef)
  }
  updateApproGo(data: any): Observable<void> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/appro_go/' + id)
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteApproGo(id: string): Observable<void> {
    const docRef = doc(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/appro_go/' + id)
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //pannes
  addpannes(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/pannes');
    const docRef = addDoc(EnginsCollection, data).then(response => response.id)
    return from(docRef)
  }
}
