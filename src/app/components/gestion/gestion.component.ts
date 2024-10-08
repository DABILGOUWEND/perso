import { Component, inject } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
import { AuthenService } from '../../authen.service';
import { Router, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-gestion',
  standalone: true,
  imports: [ImportedModule, HomeTemplateComponent,RouterOutlet],
  templateUrl: './gestion.component.html',
  styleUrl: './gestion.component.scss'
})
export class GestionComponent {
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
