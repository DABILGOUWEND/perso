import { APP_ID, Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ClasseEnginsStore, CompteStore, EnginsStore, EntrepriseStore, PannesStore, PersonnelStore, ProjetStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router } from '@angular/router';
import { forkJoin, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { TaskService } from '../../task.service';
import { WenService } from '../../wen.service';
export const APP_Is = 'AIzaSyBsK6a4cgI9g94bdY050vnuI3BP3ejiiXE';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportedModule],
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
  _pannes_store = inject(PannesStore);
  _service=inject(WenService)
  selectedOption = signal<string | undefined>('');
  constructor() {
    effect(() => {
    console.log(this._compte_store.donnees_engins())
    })
  }

  projet_compte = computed(() => {
    let filtre = this._projet_store.donnees_projet().filter(
      x => {
        return this._auth_service.userSignal()?.projet_id.includes(x.id)
      }
    )
    return filtre.map(x => ({ 'intitule': x.intitule, 'id': x.id }))
  })

  ngOnInit() {
    //this._engins_store.loadengins();
    //this._classe_store.loadclasses();
    //this._personnel_store.loadPersonnel();
    this._projet_store.loadProjets();
    //this._pannes_store.loadPannes();
    this.selectedOption.set(this._auth_service.userSignal()?.current_projet_id); 
    this._compte_store.loadData()
  }
  logout() {
    this._auth_service.logout().subscribe();
  }
  click_register() {
    this.router.navigateByUrl('/register');
  }
  click_gasoil() {
    this.router.navigateByUrl('/gasoil');
  }
  click_pointage() {
    this.router.navigateByUrl('/pointage');
  }
  click_pannes() {
    this.router.navigateByUrl('/pannes');
  }
  click_travaux() {
    this.router.navigateByUrl('/travaux');
  }
  click_accueil() {
    this.router.navigateByUrl('/accueil');
  }
  prestation() {
    this.router.navigateByUrl('/prestation');
  }

  upload_personnel() {
    let observ: any = [];
    this._personnel_store.donnees_personnel().forEach(element => {
      let dates = element.dates;
      let presence = element.Presence;
      let heureSup = element.heureSup;
      let heuresNorm = element.heuresN;
      let Presence = [];
      for (let key in dates) {
        Presence.push(
          {
            'date': dates[key],
            'presence': presence[key],
            'heure_normale': heuresNorm[key],
            'heure_sup': heureSup[key]
          }
        )
      }

      const myId = element.id;
      let mydata = {
        nom: element.nom,
        prenom: element.prenom,
        phone1: element.num_phone1,
        phone2: element.num_phone2,
        email: element.email,
        fonction: element.fonction,
        num_matricule: element.num_matricule,
        statut_id: element.statut_id,
        presence: Presence

      };

      observ.push(
        this._task_service.addPersonnel(mydata)
      )
    });
    forkJoin(observ).subscribe()
  }
  upload_engins() {
    let obsrv: Observable<any>[] = []
    this._engins_store.donnees_engins().forEach((element) => {
      let pannes = this._pannes_store.pannes_data().filter(x => x.engin_id == element.id);
      let pannes_engins: any = [];
      pannes.forEach(element => {
        pannes_engins.push({
          'date_panne': element.debut_panne,
          'date_depanne': element.fin_panne,
          'motif': element.motif_panne,
          'heure_panne': element.heure_debut,
          'heure_depanne': element.heure_fin
        })
      });
      let myId = uuid();
      let mydata = {
        "id": myId,
        "designation": element.designation,
        "code_parc": element.code_parc,
        "classe_id": element.classe_id,
        "utilisateur_id": element.utilisateur_id,
        "immatriculation": element.immatriculation,
        "pannes": pannes_engins
      }

      obsrv.push(
        this._task_service.addEngins(mydata)
      )
    })
    forkJoin(obsrv).subscribe()
  }
  upload_classe_engins() {
    let obsrv: Observable<any>[] = []
    this._classe_store.classes().forEach((element) => {
      let myId = uuid();
      let mydata = {
        "designation": element.designation,
        "taches": element.taches
      }

      obsrv.push(
        this._task_service.addClassesEngins(mydata)
      )
    })
    forkJoin(obsrv).subscribe()
  }
  choice_projet(data: any) {
    this._auth_service.userSignal.update((user: any) => (
      {
        ...user, current_projet_id: data.value
      }
    )
    )
    localStorage.setItem('user', JSON.stringify(this._auth_service.userSignal()));
  }
  other()
  {
   this._service.getallProjetId().then(console.log)
  }
}
