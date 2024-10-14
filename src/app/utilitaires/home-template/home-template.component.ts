import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, inject, input, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [NgTemplateOutlet, ImportedModule],
  templateUrl: './home-template.component.html',
  styleUrl: './home-template.component.scss'
})
export class HomeTemplateComponent implements OnInit{

 nav_liste=input.required<TemplateRef<any>>();
 toolbar=input.required<TemplateRef<any>>();
 content=input.required<TemplateRef<any>>();
 _auth_service=inject(AuthenService);
 ngOnInit() {

 }
 choix_projet(data:any)
 {
  this._auth_service.current_projet_id.set(data.value);
 }
 logout()
 {
  this._auth_service.logout().subscribe()
 }
}
