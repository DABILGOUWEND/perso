import { inject, Injectable, signal } from '@angular/core';
import { AuthenService } from './authen.service';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  _http = inject(HttpClient);
  _auth_service = inject(AuthenService);

  getCompteData(): Observable<any> {
    let url = 'https://mon-projet-35c49-default-rtdb.firebaseio.com/COMPTES/' +
      this._auth_service.userSignal()?.current_projet_id + '.json'
    return this._http.get(url);
  }
  addCompteEnginsData(data: any): Observable<any> {
    let data_stringif = JSON.stringify(data);
    let url = 'https://mon-projet-35c49-default-rtdb.firebaseio.com/COMPTES/' +
      this._auth_service.userSignal()?.current_projet_id + '/engins/' + data.id + '.json'
    return this._http.put(url, data_stringif)
  }
  addComptePersonnelData(data: any): Observable<any> {
    let data_stringif = JSON.stringify(data);
    let url = 'https://mon-projet-35c49-default-rtdb.firebaseio.com/COMPTES/' +
      this._auth_service.userSignal()?.current_projet_id + '/personnel/' + data.id + '.json';
    return this._http.put(url, data_stringif)
  }

}
