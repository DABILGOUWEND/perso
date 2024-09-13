import { Component, OnInit, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';
import { UserStore } from './store/appstore';
import { WenService } from './wen.service';

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
     this._service.user$.subscribe(
      resp=>console.log(resp)
     )
    })
  }

  title = 'wenbtp';
  router = inject(Router)
  _auth_service = inject(AuthenService)
  _user_store=inject(UserStore);
  _service = inject(WenService);

  ngOnInit() {
    this._user_store.loadUsers();
    this._auth_service.user$.subscribe({
      next: (user: any) => {
        if (user) {
          let mysuser=this._user_store.users_data().find(x=>x.uid==user.uid)
          this._auth_service.currentUserSignal.set({
            uid: user.uid,
            email: user.email,
            role: mysuser?.role
          })
        }
      }
    })
  }
  click_login() {
    this.router.navigateByUrl('/login')

  }

  click_register() {
    this.router.navigateByUrl('/register')

  }
  logout() {
    this._auth_service.logout().subscribe({
      next: () => { this.router.navigateByUrl('/login') }
    })
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
