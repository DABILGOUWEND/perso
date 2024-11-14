import { Component, inject, OnInit } from '@angular/core';
import { eleves_store } from '../../store/appstore';
import { ImportedModule } from '../../modules/imported/imported.module';
import { eleves } from '../../models/modeles';

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

  ajouter() {
    this.eleves_store.addEleves({
   'id':  '',
    'nom': 'DIALLO'  ,
    'prenom': 'Mamadou'  ,
    'sexe': 'Masculin'  ,
    'date_naissance':   '2000-01-01',
    'lieu_naissance':   'Conakry',
    'nom_parent':   'DIALLO',
    'prenom_parent':  'Hamidou',
    'profession_parent': 'Enseignant',
    'telephone_parent':   '621-123-456',
    } as eleves)

    }
}
