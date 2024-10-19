import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
import { DevisStore, LigneDevisStore, SstraitantStore } from '../../store/appstore';

@Component({
  selector: 'app-home-travaux',
  standalone: true,
  imports: [RouterOutlet, ImportedModule,HomeTemplateComponent],
  templateUrl: './home-travaux.component.html',
  styleUrl: './home-travaux.component.scss'
})
export class HomeTravauxComponent  implements OnInit {
  _devis_Store = inject(DevisStore)
  _ligneDevis_Store = inject(LigneDevisStore)
  _sousTraitance_Store = inject(SstraitantStore)
  
  ngOnInit() {
    this._devis_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/devis');
    this._ligneDevis_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/lignes_devis');
    this._sousTraitance_Store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/sous_traitants');
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
