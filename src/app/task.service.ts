import { inject, Injectable, signal } from '@angular/core';
import { AuthenService } from './authen.service';
import { from, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';
import { addDoc, collection, collectionData, deleteDoc, doc, Firestore, setDoc } from '@angular/fire/firestore';
import { Engins, Projet, tab_personnel, tab_ProjetStore } from './models/modeles';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _http = inject(HttpClient);
  _auth_service = inject(AuthenService);
  db: Firestore = inject(Firestore);

  //engins
  getallEngins(): Observable<Engins[]> {
    const Collection = collection(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/engins');
    return collectionData(Collection, { idField: 'id' }) as Observable<Engins[]>
  }
  addEngins(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/engins');
    const docRef = addDoc(EnginsCollection, data).then
      (response =>
        response.id
      )
    return from(docRef)
  }
  updateEngins(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/engins');
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteEngins(id:string): Observable<any> {
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/engins');
    const promise = deleteDoc(docRef)
    return from(promise)
  }

  //personnel
  getallPersonnel(): Observable<tab_personnel[]> {
    const Collection = collection(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/personnel');
    return collectionData(Collection, { idField: 'id' }) as Observable<tab_personnel[]>
  }
  addPersonnel(data: any): Observable<string> {
    const Collection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/personnel');
    const docRef = addDoc(Collection, data).then
      (response =>
        response.id
      )
    return from(docRef)
  }
  updatePersonnel(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/personnel');
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deletePersonnel(id:string): Observable<any> {
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/personnel');
    const promise = deleteDoc(docRef)
    return from(promise)
  }
  //classes_engins
  getallClassesEngins(): Observable<Engins[]> {
    const Collection = collection(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins');
    return collectionData(Collection, { idField: 'id' }) as Observable<Engins[]>
  }
  addClassesEngins(data: any): Observable<string> {
    const EnginsCollection = collection(this.db, 'comptes/' +
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins');
    const docRef = addDoc(EnginsCollection, data).then
      (response =>
        response.id
      )
    return from(docRef)
  }
  updateClassesEngins(data: any): Observable<any> {
    let id = data.id
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins');
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteClassesEngins(id:string): Observable<any> {
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/classes_engins');
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
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/projet');
    const promise = setDoc(docRef, data)
    return from(promise)
  }
  deleteProjets(id:string): Observable<any> {
    const docRef = doc(this.db, 'comptes/'+
      this._auth_service.userSignal()?.current_projet_id + '/projet');
    const promise = deleteDoc(docRef)
    return from(promise)
  }
}
