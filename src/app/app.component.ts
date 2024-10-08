import { Component, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImportedModule } from './modules/imported/imported.module';
import { AuthenService } from './authen.service';
import { Auth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor() {
    this._auth.onAuthStateChanged(
      (userCredential) => {
        if(userCredential)
        this._auth_service.handleCreateUser(userCredential);
      })
  }
  _auth_service = inject(AuthenService);
  _auth = inject(Auth);
  title = signal('wenbtp');
  ngOnInit() {
   this._auth_service.autoLogin();
  }
}
