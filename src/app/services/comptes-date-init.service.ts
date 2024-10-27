import { inject, Injectable } from '@angular/core';

import { Observable, switchMap, concat, map } from 'rxjs';
import { appro_gasoil } from '../models/modeles';
import { TaskService } from '../task.service';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ComptesDateInitService {
  db = inject(Firestore)
  _task_service = inject(TaskService)
  upload_data(source_path: string, destination_path: string, compte_id: string) {
    let obsrv: Observable<any>[] = [];
    let url = 'comptes/' + compte_id + '/' + destination_path;
    const source_collection = collection(this.db, source_path)
    let rep = collectionData(source_collection, { idField: 'id' }) as Observable<any[]>

 rep.pipe(switchMap(data => {
      console.log(data)
      data.forEach(
        (element: any) => {
          obsrv.push(
            this._task_service.addModel(url, element)
          )
        })
      return concat(obsrv)
    }
    )).subscribe( )
  }

}
