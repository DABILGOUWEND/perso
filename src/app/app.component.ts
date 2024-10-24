import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';
import { Auth } from '@angular/fire/auth';
import { ApproGasoilStore, ClasseEnginsStore, CompteStore, DatesStore, EnginsStore, EntrepriseStore, GasoilStore, PannesStore, PersonnelStore, ProjetStore, StatutStore, TachesStore } from './store/appstore';
import { TaskService } from './task.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  _engins_store = inject(EnginsStore);
  _classe_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _compte_store = inject(CompteStore);
  _task_service = inject(TaskService);
  _pannes_store = inject(PannesStore);
  _conso_store = inject(GasoilStore);
  _appro_go = inject(ApproGasoilStore);
  _statut_store = inject(StatutStore);
  _auth_service = inject(AuthenService);
  _taches_store = inject(TachesStore);
  _entreprise_store = inject(EntrepriseStore);

  _consogo_store = inject(GasoilStore);
  _approgo_store = inject(ApproGasoilStore);
  _classes_engins_store = inject(ClasseEnginsStore);

  constructor() {
    this._auth.onAuthStateChanged(
      (userCredential) => {
        if (userCredential)
          this._auth_service.handleCreateUser(userCredential);
      })
  }


  _auth = inject(Auth);
  title = signal('wenbtp');
  ngOnInit() {
    this._auth_service.autoLogin();
    this._personnel_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/personnel');
    this._engins_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/engins');
    this._classe_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/classes_engins');
    this._conso_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/conso_gasoil');
    this._pannes_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/pannes');
    this._appro_go.setPathString('comptes/' + this._auth_service.current_projet_id() + '/appro_go');
    this._statut_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/statuts_personnel');
    this._taches_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/taches');

  }
}
