import { Component, effect, inject, OnInit } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
import { AuthenService } from '../../authen.service';
import { Router, RouterOutlet } from '@angular/router';
import { EnginsStore, ClasseEnginsStore, PersonnelStore, ProjetStore, CompteStore, PannesStore, GasoilStore, ApproGasoilStore } from '../../store/appstore';
import { TaskService } from '../../task.service';
import { WenService } from '../../wen.service';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [ImportedModule, HomeTemplateComponent, RouterOutlet],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss'
})
export class GestionComponent implements OnInit {
  ngOnInit() {
    //set path
    this._personnel_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/personnel');
    this._engins_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/engins');
    this._classe_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/classes_engins');
    this._conso_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/conso_gasoil');
    this._pannes_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/pannes');
    this._appro_go.setPathString('comptes/' + this._auth_service.current_projet_id() + '/appro_go');
    
    
    //load data
    this._projet_store.loadProjets();
    this._engins_store.loadengins();
    this._classe_store.loadclasses();
    this._personnel_store.loadPersonnel();
    this._conso_store.loadconso();
    this._appro_go.loadappro();
    this._pannes_store.loadPannes();
  }

  constructor() {
    effect(() => {
    })
  }

  //injections
  _engins_store = inject(EnginsStore);
  _classe_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _compte_store = inject(CompteStore);
  _task_service = inject(TaskService);
  _pannes_store = inject(PannesStore);
  _conso_store = inject(GasoilStore);
  _appro_go = inject(ApproGasoilStore);
  _auth_service = inject(AuthenService);
  _router = inject(Router);

  logout() {
    this._auth_service.logout().subscribe();
  }
  click_accueil() {
    this._router.navigateByUrl('/home');
  }
  click_gasoil() {
    this._router.navigateByUrl('home_gestion/gasoil')
  }
  click_pannes() {
    this._router.navigateByUrl('home_gestion/pannes')
  }
  click_pointages() {
    this._router.navigateByUrl('home_gestion/pointages')
  }
}
