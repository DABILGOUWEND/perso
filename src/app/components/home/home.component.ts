import { APP_ID, Component, computed, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ApproGasoilStore, ClasseEnginsStore, CompteStore, EnginsStore, EntrepriseStore, GasoilStore, PannesStore, PersonnelStore, ProjetStore, StatutStore, TachesStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router, RouterOutlet } from '@angular/router';
import { concat, forkJoin, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { TaskService } from '../../task.service';
import { WenService } from '../../wen.service';
import { EnginsComponent } from '../engins/engins.component';
import { Auth, authState } from '@angular/fire/auth';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
export const APP_Is = 'AIzaSyBsK6a4cgI9g94bdY050vnuI3BP3ejiiXE';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportedModule, RouterOutlet, HomeTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
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
  
  //methods
  ngOnInit() {
    this._personnel_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/personnel');
    this._engins_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/engins');
    this._classe_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/classes_engins');
    this._conso_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/conso_gasoil');
    this._pannes_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/pannes');
    this._appro_go.setPathString('comptes/' + this._auth_service.current_projet_id() + '/appro_go');
    this._statut_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/statuts_personnel');
    this._taches_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/taches');

    this._projet_store.loadProjets();
    this._entreprise_store.loadEntreprises();

    ///
  }
}
