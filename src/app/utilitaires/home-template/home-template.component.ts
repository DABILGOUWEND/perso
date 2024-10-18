import { NgTemplateOutlet } from '@angular/common';
import { Component, computed, effect, EventEmitter, inject, input, Input, OnInit, Output, signal, TemplateRef } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AuthenService } from '../../authen.service';
import { TaskService } from '../../task.service';
import { GasoilComponent } from '../../components/gasoil/gasoil.component';
import { GasoilService } from '../../services/gasoil.service';
import { EnginsStore, GasoilStore, ProjetStore } from '../../store/appstore';

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
 _projet_store=inject(ProjetStore);

 selected_projet_id=signal<string | undefined>('');


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

//computed properties
 projets = computed(() => {
  return this._projet_store.donnees_projet().filter(x => {
    return this._auth_service.userSignal()?.projet_id.includes(x.id)
  }).map(x => {
    return {
      id: x.id,
      intitule: x.intitule
    }
  })
})

}
