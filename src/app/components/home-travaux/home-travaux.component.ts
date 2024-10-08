import { Component, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';

@Component({
  selector: 'app-home-travaux',
  standalone: true,
  imports: [RouterOutlet, ImportedModule,HomeTemplateComponent],
  templateUrl: './home-travaux.component.html',
  styleUrl: './home-travaux.component.scss'
})
export class HomeTravauxComponent {
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
  click_factures()
  {
    this.router.navigateByUrl('home_travaux/factures');
  }
}
