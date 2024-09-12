import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'wenbtp';
  router = inject(Router)
  _auth_service = inject(AuthenService)

  ngOnInit() {
    
  }
  click_login() {
    this.router.navigateByUrl('/login')

  }
  logout() {
    this._auth_service.logout()
  }
  click_gasoil() {
    this.router.navigateByUrl('/gasoil')

  }
  click_pointage() {
    this.router.navigateByUrl('/pointage')

  }
  click_pannes() {
    this.router.navigateByUrl('/pannes')

    
  }
  click_travaux() {
    this.router.navigateByUrl('/travaux')

  
  }
  click_accueil() {
    this.router.navigateByUrl('/accueil')

 
  }
  prestation() {
    this.router.navigateByUrl('/prestation')
    
  }
}
