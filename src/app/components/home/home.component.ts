import { Component, effect, inject, OnInit } from '@angular/core';
import { UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router } from '@angular/router';
import { onAuthStateChanged } from '@angular/fire/auth';
import { tap } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {
  router = inject(Router);
  _user_store = inject(UserStore);
  _auth_service = inject(AuthenService);
  constructor() {
    effect(() => {  
    })
  }
  ngOnInit() {
  }
  logout()
  {
    this._auth_service.logout().subscribe(tap(() => {
      this.router.navigateByUrl('/login');
    }));
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
}
