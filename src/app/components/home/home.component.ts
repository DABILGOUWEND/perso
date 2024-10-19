import { APP_ID, Component, computed, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ApproGasoilStore, ClasseEnginsStore, CompteStore, EnginsStore, EntrepriseStore, GasoilStore, PannesStore, PersonnelStore, ProjetStore, UserStore } from '../../store/appstore';
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
  router = inject(Router);
  _user_store = inject(UserStore);
  _auth_service = inject(AuthenService);
  _http = inject(HttpClient);
  _engins_store = inject(EnginsStore);
  _classe_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _compte_store = inject(CompteStore);
  _task_service = inject(TaskService);
  _service = inject(WenService);
  selectedOption = signal<string | undefined>('');
  _auth = inject(Auth);

  //methods
  ngOnInit() {
    this._projet_store.loadProjets();
  }
  /* 
   logout() {
     this._auth_service.logout().subscribe();
   }
   click_register() {
     this.router.navigateByUrl('/register');
   }
   click_gestion() {
     this.router.navigateByUrl('/home_gestion');
   }
   click_pointage() {
     this.router.navigateByUrl('/pointage');
   }
   click_pannes() {
     this.router.navigateByUrl('/pannes');
   }
   click_travaux() {
     this.router.navigateByUrl('/home_travaux');
   }
   click_accueil() {
     this.router.navigateByUrl('/engins');
   }
   prestation() {
     this.router.navigateByUrl('/prestation');
   }
 
   upload_personnel() {
     let observ: any = [];
     this._personnel_store.personnel_data().forEach(element => {
       let mydata = {
         id: element.id,
         nom: element.nom,
         prenom: element.prenom,
         fonction: element.fonction,
         num_phone1: element.num_phone1,
         num_phone2: element.num_phone2,
         email: element.email,
         num_matricule: element.num_matricule,
         dates: element.dates,
         heuresN: element.heuresN,
         heureSup: element.heureSup,
         presence: element.presence,
         statut_id: element.statut_id
       }
       observ.push(
         this._task_service.addPersonnel(mydata)
       )
     });
     concat(observ).subscribe()
   }
   upload_engins() {
     let obsrv: Observable<any>[] = []
     this._engins_store.donnees_engins().forEach((element) => {
       let mydata = {
         "id": element.id,
         "designation": element.designation,
         "code_parc": element.code_parc,
         "classe_id": element.classe_id,
         "utilisateur_id": element.utilisateur_id,
         "immatriculation": element.immatriculation
       }
       obsrv.push(
         this._task_service.addEngins(mydata)
       )
     })
     concat(obsrv).subscribe()
   }
   upload_gasoil(): Observable<any> {
     let obsrv: Observable<any>[] = [];
     let gasoil = this._gasoil_store.conso_data();
     gasoil.forEach(
       (element: any) => {
         obsrv.push(
           this._task_service.addConsogo({
             'engin_id': element.engin_id,
             'date': element.date,
             'quantite_go': element.quantite_go,
             'compteur': element.compteur,
             'diff_work': element.diff_work,
             'numero': element.numero,
           })
         )
       })
     return concat(obsrv);
   }
   upload_approgo(): Observable<any> {
     let obsrv: Observable<any>[] = [];
     let gasoil = this._appro_go.approgo_data();
     gasoil.forEach(
       (element: any) => {
         obsrv.push(
           this._task_service.addApproGo({
             'date': element.date,
             'quantite': element.quantite,
             'reception': element.reception
           })
         )
       })
     return concat(obsrv);
   }
   upload_pannes(): Observable<any> {
     let obsrv: Observable<any>[] = [];
     let pannes = this._pannes_store.pannes_data();
     pannes.forEach(
       (element) => {
         obsrv.push(
           this._task_service.addpannes({
             engin_id: element.engin_id,
             debut_panne: element.debut_panne,
             fin_panne: element.fin_panne,
             heure_debut: element.heure_debut,
             heure_fin: element.heure_fin,
             motif_panne: element.motif_panne,
             situation: element.situation
           })
         )
       })
     return concat(obsrv);
   }
   loadData() {
     this.upload_gasoil().subscribe()
   }
   upload() {
     let obsrv: Observable<any>[] = []
     let pannes = this._pannes_store.pannes_data();
     pannes.forEach(element => {
       obsrv.push(
         this._task_service.addpannes({
           'engin_id': element.engin_id,
           'date_panne': element.debut_panne,
           'date_depanne': element.fin_panne,
           'motif': element.motif_panne,
           'heure_panne': element.heure_debut,
           'heure_depanne': element.heure_fin
         })
       )
     });
     forkJoin(obsrv).subscribe();
   }
   upload_classe_engins() {
     let obsrv: Observable<any>[] = []
     this._classe_store.classes().forEach((element) => {
       let mydata = {
         "id": element.id,
         "designation": element.designation,
         "taches": element.taches
       }
       obsrv.push(
         this._task_service.addClassesEngins(mydata)
       )
     })
     concat(obsrv).subscribe()
   }
   choice_projet(data: any) {
     this._auth_service.userSignal.update((user: any) => (
       {
         ...user, current_projet_id: data.value
       }
     )
     )
     localStorage.setItem('user', JSON.stringify(this._auth_service.userSignal()));
     this._auth_service.current_projet_id.set(data.value);
   } */

}
