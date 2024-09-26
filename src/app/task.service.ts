import { inject, Injectable, signal } from '@angular/core';
import { AuthenService } from './authen.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  //signals
  entreprise_name=signal<string|undefined>(undefined);
 _auth_service=inject(AuthenService);
 
}
