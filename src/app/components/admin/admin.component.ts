import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { __importDefault } from 'tslib';
import { ImportedModule } from '../../modules/imported/imported.module';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [RouterOutlet,ImportedModule,HomeTemplateComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent implements OnInit {
  _router=inject(Router);
  constructor() { }
  ngOnInit(): void {
  }
  click_home(){
    this._router.navigateByUrl('/home');
  }
  click_register(){
    this._router.navigateByUrl('admin/register');
  }
  click_tableau_bord(){
    this._router.navigateByUrl('admin/tableau_bord');
  }

}
