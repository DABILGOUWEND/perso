import { Component, inject, signal } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  message =signal('');
  _auth_service = inject(AuthenService);
  registerForm: FormGroup;
  router=inject(Router);
  constructor(
    private _fb: FormBuilder
  )
  {
    this.registerForm = this._fb.group(
      {
        email: new FormControl('', Validators.required),
        password: new FormControl('', Validators.required),
        role: new FormControl('', Validators.required),
        nom: new FormControl('', Validators.required)
      }
    )
  }
  submitRegister()
  {
    let value = this.registerForm.getRawValue();
    this._auth_service.register(value.email, value.password,value.role,value.nom).subscribe({
      next: (resp) => {
        console.log(resp)
        //this.router.navigateByUrl('/login');
      },
      error: error => { 
        this.message.set('erreur lors de l\'inscription:'+error);
       }
    })
  }
}
