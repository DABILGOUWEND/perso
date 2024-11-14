import { Component, inject, OnInit } from '@angular/core';
import { eleves_store } from '../../store/appstore';
import { ImportedModule } from '../../modules/imported/imported.module';

@Component({
  selector: 'app-eleve-inscript',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './eleve-inscript.component.html',
  styleUrl: './eleve-inscript.component.scss'
})
export class EleveInscriptComponent implements OnInit {
  ngOnInit(){
    this.eleves_store.loadEleves( )
  }
  eleves_store=inject(eleves_store);
}
