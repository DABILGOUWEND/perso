import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';
import { Auth } from '@angular/fire/auth';
import { ApproGasoilStore, AttachementStore, ClasseEnginsStore, CompteStore, ConstatStore, DatesStore, DecompteStore, DevisStore, EnginsStore, EntrepriseStore, GasoilStore, LigneDevisStore, PannesStore, PersonnelStore, ProjetStore, SstraitantStore, StatutStore, TachesEnginsStore, TachesStore } from './store/appstore';
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
  _classes_engins_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projets_store = inject(ProjetStore);
  _pannes_store = inject(PannesStore);
  _consogo_store = inject(GasoilStore);
  _approgo_store = inject(ApproGasoilStore);
  _statuts_personnel_store = inject(StatutStore);
  _taches_engins_store = inject(TachesEnginsStore);
  _entreprise_store = inject(EntrepriseStore);
  _devis_store = inject(DevisStore)
  _constat_store = inject(ConstatStore)
  _ligneDevis_store = inject(LigneDevisStore)
  _sousTraitance_store = inject(SstraitantStore)
  _attachements_store = inject(AttachementStore)
  _decomptes_store = inject(DecompteStore)
  
  _auth_service = inject(AuthenService);

  constructor() {
  /*   this._auth.onAuthStateChanged(
      (userCredential) => {
        if (userCredential)
          this._auth_service.handleCreateUser(userCredential);
      }) */
  }


  _auth = inject(Auth);
  title = signal('wenbtp');
  ngOnInit() {
    //this._auth_service.autoLogin();
  }
}
