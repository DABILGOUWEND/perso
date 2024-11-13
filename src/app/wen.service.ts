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
@Injectable({
  providedIn: 'root'
})
export class WenService {


  htp: HttpClient=inject(HttpClient)

  get_all_eleves(): Observable<any> {
    return this.htp.get('http://localhost:3000/school')
  }
}
