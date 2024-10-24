import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
import { AttachementStore, ConstatStore, DecompteStore, DevisStore, LigneDevisStore, ProjetStore, SstraitantStore } from '../../store/appstore';
import { DataLoaderService } from '../../services/data-loader.service';

@Component({
  selector: 'app-home-travaux',
  standalone: true,
  imports: [RouterOutlet, ImportedModule, HomeTemplateComponent],
  templateUrl: './home-travaux.component.html',
  styleUrl: './home-travaux.component.scss'
})
export class HomeTravauxComponent implements OnInit {


  _auth_service = inject(AuthenService);
  _loader_service = inject(DataLoaderService);
  _router = inject(Router);

  ngOnInit() {
    this._loader_service.setPath();
    this._loader_service.loadDataInit();
    this._loader_service.Load_travaux_Data();

    }

  logout() {
    this._auth_service.logout().subscribe();
  }
  accueil() {
    this._router.navigateByUrl('/home');
  }
  click_devis() {
    this._router.navigateByUrl('home_travaux/devis');
  }
  click_constats() {
    this._router.navigateByUrl('home_travaux/constats');
  }
  click_attachements() {
    this._router.navigateByUrl('home_travaux/attachements');
  }
}
