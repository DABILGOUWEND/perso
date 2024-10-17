import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';
import { Auth } from '@angular/fire/auth';
import { ApproGasoilStore, ClasseEnginsStore, DatesStore, EnginsStore, GasoilStore, PannesStore, PersonnelStore, ProjetStore } from './store/appstore';
import { TaskService } from './task.service';
import { GasoilService } from './services/gasoil.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor() {
    this._auth.onAuthStateChanged(
      (userCredential) => {
        if (userCredential)
          this._auth_service.handleCreateUser(userCredential);
      })

   
    
  }


  _auth_service = inject(AuthenService);
  _consogo_store = inject(GasoilStore);
  _approgo_store = inject(ApproGasoilStore);
  _engins_store = inject(EnginsStore);
  _classes_engins_store = inject(ClasseEnginsStore);
  _pannes_store = inject(PannesStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _task_service = inject(TaskService);
  _gasoil_service = inject(GasoilService);
  _gasoil_store = inject(GasoilStore)
  _date_store = inject(DatesStore)
  _auth = inject(Auth);
  title = signal('wenbtp');
  ngOnInit() {
    this._auth_service.autoLogin();
    this._classes_engins_store.loadclasses(); 
    this._engins_store.loadengins() ;

  }


}
