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
      console.log(this._user_store.users())
    })
  }
  ngOnInit() {
    this.entreprise_store.loadEntreprises();
    this._auth_service.user$.subscribe((user: any) => {
      if (user) {
        let filtre = this._user_store.users().find(x => x.uid == user.uid);
        this._auth_service.currentUserSignal.set({
          uid: user.uid,
          email: user.email,
          role: filtre?.role
        });
      } else {
        this._auth_service.currentUserSignal.set(undefined);
      }
    })
  }
  setMessage() {
    if (this.authservice.isloggedIn) {
      this.message.set('vous êtes connecté.')
    } else {
      this.message.set('identifiant ou mot de passe incorrecte.')
    }
  }
  sumitlogin() {
    this.message.set('tentative de connection en cours...');
    let value = this.loginForm.getRawValue();
    this._auth_service.loginFirebase(value.email, value.password).subscribe({
      next: () => { this.router.navigateByUrl('/accueil') },
      error: error => { console.log(error) }
    })
    /*   this.authservice.login(value.identifiant, value.mot_de_passe).subscribe(response => {
        this.setMessage();
        if (response) {
         
          let niveau=this.authservice.is_connected()?.niveau;
          let url =this.users_store.getUrl()
          this.router.navigateByUrl(url)
          this.authservice.is_connected.set({id:'',identifiant:value.identifiant,mot_de_passe:value.mot_de_passe,niveau:niveau?niveau:0})
        }
        else {
          this.loginForm.get('mot_de_passe')?.setValue('')
          this.router.navigateByUrl('/login')
        }
      }) */
  }
  choiceEntreprise(data: any) {

  }
}
