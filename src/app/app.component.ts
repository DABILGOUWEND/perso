import { Component, OnInit, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';
import { EnginsStore, EntrepriseStore, UserStore } from './store/appstore';
import { WenService } from './wen.service';
import { map, of, switchMap, tap } from 'rxjs';
import { getAuth } from 'firebase/auth';
import { getDatabase, onValue, ref } from 'firebase/database';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  constructor() {

    effect(() => {
      //console.log(this._auth_service.url_entreprise()

    })
  }

  title = 'wenbtp';
  router = inject(Router);
  _auth_service = inject(AuthenService);
  _user_store = inject(UserStore);
  _service = inject(WenService);
  _engins_store = inject(EnginsStore);
  _entreprise_store = inject(EntrepriseStore)
  _http = inject(HttpClient);
  ngOnInit() {
    this._auth_service.autoLogin();
    if (this._auth_service.userSignal())
      this._http.get('https://mon-projet-35c49-default-rtdb.firebaseio.com/COMPTES/' + this._auth_service.userSignal()?.projet_id + '.json').subscribe()

  }
  click_login() {
    this.router.navigateByUrl('/login');
  }
  click_register() {
    this.router.navigateByUrl('/register');
  }
  logout() {
    this._auth_service.logout().subscribe({
      next: () => { this.router.navigateByUrl('/login') }
    })
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
