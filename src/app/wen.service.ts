import { Injectable, inject, signal } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, getDoc, setDoc, updateDoc } from '@angular/fire/firestore';
import { Observable, from, switchMap, of, concatMap, forkJoin, map, tap, BehaviorSubject } from 'rxjs';
import jsPDF from 'jspdf'
import autoTable, { Styles } from 'jspdf-autotable';
import { HttpClient } from '@angular/common/http';
import { formatNumber } from '@angular/common';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, user } from '@angular/fire/auth';
import { sign } from 'crypto';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { eleves } from './models/modeles';
import { response } from 'express';
@Injectable({
  providedIn: 'root'
})
export class WenService {
  htp: HttpClient = inject(HttpClient)
  firestore: Firestore = inject(Firestore)

  get_all_eleves(): Observable<eleves[]> {
    const eleves_collection = collection(this.firestore, 'schools/la_source/eleves')
    return collectionData(eleves_collection, { idField: 'id' }) as Observable<eleves[]>;
  }
  add_eleve(data: any): Observable<string> {
    const eleves_collection = collection(this.firestore, 'schools/la_source/eleves');
    const promise = addDoc(eleves_collection, data).then(response => response.id);
    return from(promise);
  }
  update_eleve(data: any): Observable<void> {
    const eleves_collection = doc(this.firestore, 'schools/la_source/eleves/' + data.id);
    const { id, ...new_data } = data;
    const promise = setDoc(eleves_collection, new_data);
    return from(promise);
  }
  remove_eleve(id: string): Observable<void> {
    const eleves_collection = doc(this.firestore, 'schools/la_source/eleves/' + id);
    const promise = deleteDoc(eleves_collection);
    return from(promise);
  }

}
