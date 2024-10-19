import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
import { AttachementStore, ConstatStore, DecompteStore, DevisStore, LigneDevisStore, SstraitantStore } from '../../store/appstore';

@Component({
  selector: 'app-home-travaux',
  standalone: true,
  imports: [RouterOutlet, ImportedModule,HomeTemplateComponent],
  templateUrl: './home-travaux.component.html',
  styleUrl: './home-travaux.component.scss'
})
export class HomeTravauxComponent  implements OnInit {
  _devis_Store = inject(DevisStore)
  _constat_Store = inject(ConstatStore)
  _ligneDevis_Store = inject(LigneDevisStore)
  _sousTraitance_Store = inject(SstraitantStore)
  _attachements_Store = inject(AttachementStore)
  _decomptes_Store = inject(DecompteStore)
  
  ngOnInit() {
    this._devis_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/devis');
    this._ligneDevis_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/lignes_devis');
    this._sousTraitance_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/sous_traitants');
    this._constat_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/constats');
    this._attachements_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/attachements');
    this._decomptes_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/decomptes');

    //load data
    this._devis_Store.loadDevis();
    this._ligneDevis_Store.loadLigneDevis();
    this._sousTraitance_Store.loadSstraitants();
    this._constat_Store.loadConstats();
    this._attachements_Store.loadAttachements();
    this._decomptes_Store.loadAllDecomptes();

  }
  _auth_service = inject(AuthenService);
  router = inject(Router);
  logout() {
    this._auth_service.logout().subscribe();
  
  }
  accueil() {
    this.router.navigateByUrl('/home');
  } 
  click_devis()
  {
    this.router.navigateByUrl('home_travaux/devis');
  }
  click_budget()
  {
    this.router.navigateByUrl('home_travaux/budget');
  }
  click_constats()
  {
    this.router.navigateByUrl('home_travaux/constats');
  }
  click_attachements()
  {
    this.router.navigateByUrl('home_travaux/attachements');
  }
  click_decomptes()
  {
    this.router.navigateByUrl('home_travaux/decomptes');
  }
}
