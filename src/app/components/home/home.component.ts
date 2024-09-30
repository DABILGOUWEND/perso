import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ClasseEnginsStore, CompteStore, EnginsStore, EntrepriseStore, PersonnelStore, ProjetStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router } from '@angular/router';
import { forkJoin, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { TaskService } from '../../task.service';
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
  _compte_store = inject(CompteStore)
  _task_service = inject(TaskService)
  selectedOption = signal<string | undefined>('');
  constructor() {
    effect(() => {
    // console.log(this._compte_store.donnees_classesEngins())
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
    this._engins_store.loadengins();
    this._classe_store.loadclasses();
    this._personnel_store.loadPersonnel();
    this._projet_store.loadProjets();
    this._compte_store.loadCompte();
    this.selectedOption.set(this._auth_service.userSignal()?.current_projet_id);
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
      const myId = element.id
      let mydata = {
        id: myId,
        nom: element.nom,
        prenom: element.prenom,
        phone1: element.num_phone1,
        phone2: element.num_phone2,
        email: element.email,
        fonction: element.fonction,
        num_matricule: element.num_matricule,
        statut_id: element.statut_id
      };

      observ.push(
        this._task_service.addComptePersonnelData(mydata)
      )
    });
    forkJoin(observ).subscribe()
  }
  upload_engins() {
    let obsrv: Observable<any>[] = []
    this._engins_store.donnees_engins().forEach((element) => {
      let myId = uuid();
      let mydata = {
        "id": myId,
        "designation": element.designation,
        "code_parc": element.code_parc,
        "classe_id": element.classe_id,
        "utilisateur_id": element.utilisateur_id,
        "immatriculation": element.immatriculation,
      }

      obsrv.push(
        this._task_service.addCompteEnginsData(mydata)
      )
    })
    forkJoin(obsrv).subscribe()
  }
  upload_classe_engins() {
    let obsrv: Observable<any>[] = []
    this._classe_store.classes().forEach((element) => {
      let myId = uuid();
      let mydata = {
        "id": element.id,
        "designation": element.designation,
        "taches": element.taches
      }

      obsrv.push(
        this._task_service.addCompteClasseEnginsData(mydata)
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
    this._compte_store.loadCompte()
  }
  update_engins() {
    let mydata = {
      "id": uuid(),
      "designation": 'element.designation',
      "code_parc": 'element.code_parc',
      "classe_id": 'element.code_parc',
      "utilisateur_id": 'element.classe_id',
      "immatriculation": 'element.immatriculation',
    }
    this._task_service.updateEnginsData(mydata).subscribe();
  }
}
