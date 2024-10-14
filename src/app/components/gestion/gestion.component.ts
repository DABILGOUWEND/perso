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
  imports: [ImportedModule, HomeTemplateComponent,RouterOutlet],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss'
})
export class GestionComponent implements OnInit {
  _engins_store = inject(EnginsStore);
  _classe_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _compte_store = inject(CompteStore);
  _task_service = inject(TaskService);
  _pannes_store = inject(PannesStore);
  _gasoil_store = inject(GasoilStore);
  _appro_go = inject(ApproGasoilStore);
  _service = inject(WenService);
  constructor(){
    effect(()=>{
    })
  }
  ngOnInit()  {
  }
  _auth_service = inject(AuthenService);
  router = inject(Router);
  logout() {
    this._auth_service.logout().subscribe();
  }
  click_accueil() {
    this.router.navigateByUrl('/home');
  }
  click_gasoil()
  {
this.router.navigateByUrl('home_gestion/gasoil')
  }
  click_pannes()
  {
this.router.navigateByUrl('home_gestion/pannes')
  }
  click_pointages(){
this.router.navigateByUrl('home_gestion/pointages')
  }


}
