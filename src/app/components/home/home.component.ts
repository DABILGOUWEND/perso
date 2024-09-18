import { Component, effect, inject, OnInit } from '@angular/core';
import { UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent  implements OnInit {
  router = inject(Router);
  _auth_service = inject(AuthenService);
  constructor() {
    effect(() => { 
  } )
}
  ngOnInit() {
  }
  _user_store = inject(UserStore);
  logout()
  {
    this._auth_service.logout().subscribe()
  }


}
