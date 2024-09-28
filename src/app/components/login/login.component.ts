import { Component, effect, inject, signal } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { EntrepriseStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { Router } from '@angular/router';
import { ImportedModule } from '../../modules/imported/imported.module';
import { WenService } from '../../wen.service';
import { error } from 'console';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  entreprise_store = inject(EntrepriseStore);
  _service = inject(WenService);
  _auth_service = inject(AuthenService);
  _user_store = inject(UserStore);
  _entreprise=inject(EntrepriseStore);
  loginForm: FormGroup;
  message = signal('vous êtes déconnecté');
  constructor(
    private router: Router,
    private authservice: AuthenService,
    private _fb: FormBuilder
  ) {
    this.loginForm = this._fb.group(
      {
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
      }
    )
    effect(() => {
    })
  }
  ngOnInit() {
  }
  setMessage() {
    if (this.authservice.isloggedIn()) {
      this.message.set('vous êtes connecté.')
    } else {
      this.message.set('identifiant ou mot de passe incorrecte.')
    }
  }
  sumitlogin() {
    this.message.set('tentative de connection en cours...');
    let value = this.loginForm.getRawValue();
    this._auth_service.loginFirebase(value.email, value.password).subscribe(
      {
        next: () => {
          setTimeout(() => {
           this.message.set('connexion réussie');
            this.authservice.loadings.set(false);
            this.router.navigateByUrl('/home');
            
          }, 2000);
         
        },
        error: error => {
          this.message.set('erreur lors de la connexion:' + error);
          this.authservice.loadings.set(false);
        }
      }
    )
  }
  choiceEntreprise(data: any) {

  }
}
