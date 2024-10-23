import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { __importDefault } from 'tslib';
import { ImportedModule } from '../../modules/imported/imported.module';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
import { ApproGasoilStore, ClasseEnginsStore, CompteStore, EnginsStore, EntrepriseStore, GasoilStore, PannesStore, PersonnelStore, ProjetStore, StatutStore, TachesEnginsStore, TachesStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,ImportedModule,HomeTemplateComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {

  _engins_store = inject(EnginsStore);
  _classes_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _compte_store = inject(CompteStore);
  _task_service = inject(TaskService);
  _pannes_store = inject(PannesStore);
  _conso_store = inject(GasoilStore);
  _appro_go = inject(ApproGasoilStore);
  _statut_store = inject(StatutStore);
  _auth_service = inject(AuthenService);
  _taches_store = inject(TachesEnginsStore);
  _entreprise_store = inject(EntrepriseStore);
  _user_store = inject(UserStore);
  
  _router=inject(Router);
  constructor() { }
  ngOnInit(){
    this._projet_store.loadProjets();
    this._entreprise_store.loadEntreprises();
    this._user_store.loadUsers();
    this._classes_store.loadclasses();
    this._taches_store.loadTachesEngins();
  }
  click_home(){
    this._router.navigateByUrl('/home');
  }
  click_register(){
    this._router.navigateByUrl('admin/register');
  }
  click_tableau_bord(){
    this._router.navigateByUrl('admin/tableau_bord');
  }

}
