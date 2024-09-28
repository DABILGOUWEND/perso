import { Component, effect, inject, OnInit } from '@angular/core';
import { ClasseEnginsStore, EnginsStore, EntrepriseStore, PersonnelStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router } from '@angular/router';
import { forkJoin, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
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



  constructor() {
    effect(() => {
    })
  }
  ngOnInit() {
    this._engins_store.loadengins();
    this._classe_store.loadclasses();
    this._personnel_store.loadPersonnel();
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
      let stringif = JSON.stringify(mydata);
      console.log(this._auth_service.url_entreprise())
      observ.push(this._http.put(this._auth_service.url_entreprise() + 'personnel/' + myId + '.json',
        stringif
      ))
    });
    forkJoin(observ).subscribe()
  }
  upload_engins() {
    const myId = uuid()
    let mydata ={
      "id": myId,
      "intitule": "CONSTRUCTION VILLAS",
      "date_debut": "ras",
      "duree": 0,
      "bailleur_id":"732e2cbd-11ef-4c10-80e4-f66fddd0cd39",
      "entreprise_id": "09819b65-40d1-4163-a505-6139c05d366b",
      "maitre_oeuvre_id": "834dcbe7-ffa8-4535-a1a3-1e523dabfe46",
      "maitre_ouvrage_id": "bbf8688e-5013-43c2-a317-32474c09f884",
      "code":'PRJ004'
     }
    let stringif = JSON.stringify(mydata);
    this._http.put('https://mon-projet-35c49-default-rtdb.firebaseio.com/PROJETS/' + myId + '.json',
      stringif
    ).subscribe()
  }
}
