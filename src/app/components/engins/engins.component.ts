import { Component, OnInit, computed, effect, inject, signal } from '@angular/core';
import { FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ImportedModule } from '../../modules/imported/imported.module';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { ClasseEnginsStore, CompteStore, EnginsStore, PersonnelStore, StatutStore } from '../../store/appstore';
import { EssaiComponent } from '../essai/essai.component';
import { AuthenService } from '../../authen.service';


@Component({
  selector: 'app-engins',
  standalone: true,
  imports: [ImportedModule, SaisiComponent, EssaiComponent],
  templateUrl: './engins.component.html',
  styleUrl: './engins.component.scss'
})
export class EnginsComponent implements OnInit {
  constructor() {
    effect(() => {
      console.log(this._auth_service.current_projet_id() );
    })
   }
  ngOnInit() {
    this.EnginsStore.setPathString('comptes/' + this._auth_service.current_projet_id() + '/engins');
    this.EnginsStore.loadengins();
    this.personnel_store.loadPersonnel();
    this.classeEngins_store.loadclasses();
  }
  EnginsStore = inject(EnginsStore);
  personnel_store = inject(PersonnelStore);
  classeEngins_store = inject(ClasseEnginsStore);
  //statut_store = inject(StatutStore);
  _auth_service = inject(AuthenService);

  fb = inject(NonNullableFormBuilder);
  table_update_form = this.fb.group({
    id: new FormControl(''),
    designation: new FormControl('', Validators.required),
    code_parc: new FormControl('', Validators.required),
    utilisateur_id: new FormControl('', Validators.required),
    classe_id: new FormControl('', Validators.required),
    immatriculation: new FormControl(''),
  });
  displayedColumns = {
    'classe': 'CLASSE',
    'designation': 'DESIGNATION',
    'code_parc': 'CODE PARC',
    'immatriculation': 'IMMATRICULATION',
    'utilisateur': 'UTILISATEUR',
    'actions': ''
  }
  titre_tableau = signal('Liste du matériel');
  table = computed(() => {
    let mytable =
      [{
        label: 'CLASSE ENGINS',
        type: 'select',
        control_name: 'classe_id',
        end_control_name: '',
        tableau: this.classe_select()
      },
      {
        label: 'DESIGNATION',
        type: 'text1',
        control_name: 'designation',
        end_control_name: '',
        tableau: []
      }
        ,

      {
        label: 'CODE PARC',
        type: 'text1',
        control_name: 'code_parc',
        end_control_name: '',
        tableau: []
      },
      {
        label: 'IMMATRICULATION',
        type: 'text1',
        control_name: 'immatriculation',
        end_control_name: '',
        tableau: []
      },
      {
        label: 'UTILISATEUR',
        type: 'select',
        control_name: 'utilisateur_id',
        end_control_name: '',
        tableau: this.utilisateur_select()
      }
      ]
    return mytable
  })

  classe_select = computed(() => {
    let donnees: any = []
    this.classeEngins_store.classes_engins()
      .forEach(element => {
        donnees.push(
          {
            id: element.id,
            valeur: element.designation
          }
        )

      });
    return donnees
  })
  utilisateur_select = computed(() => {
    let donnees: any = []
    this.personnel_store.donnees_personnel()
      .forEach(element => {
        donnees.push(
          {
            id: element.id,
            valeur: element.nom + ' ' + element.prenom
          }
        )

      });
    return donnees
  })
  dataSource = computed(
    () => {
      
      let donnees: any = []
      this.EnginsStore.donnees_engins().forEach(element => {
        
        let classe = this.classeEngins_store.classes_engins().find(x => x.id == element.classe_id)
        let utilisat = this.personnel_store.donnees_personnel().find(x => x.id == element.utilisateur_id)
        donnees.push(
          {
            'id': element.id,
            'designation': element.designation,
            'code_parc': element.code_parc,
            'immatriculation': element.immatriculation,
            'classe': classe?.designation,
            'classe_id': element.classe_id,
            'utilisateur': utilisat?.nom + ' ' + utilisat?.prenom,
            'utilisateur_id': element.utilisateur_id,
          }
        )
      });
      return donnees
    }
  )
 
  updateData(data: any) {
    let valeur = data[0]
    let current_row = data[1]
    let is_update = data[2]
    let mydata: any = []

    if (is_update) {
      mydata = {
        id: valeur.id,
        designation: valeur.designation,
        code_parc: valeur.code_parc,
        immatriculation: valeur.immatriculation,
        classe_id: valeur.classe_id,
        utilisateur_id: valeur.utilisateur_id,
        pannes:current_row.pannes,
        gasoil:current_row.gasoil,
      }
      this.EnginsStore.updateEngin(mydata);
    }
    else {
      mydata = {
        designation: valeur.designation,
        code_parc: valeur.code_parc,
        immatriculation: valeur.immatriculation,
        classe_id: valeur.classe_id,
        utilisateur_id: valeur.utilisateur_id,
        pannes:[],
        gasoil:[]
      }
      this.EnginsStore.addEngin(mydata);
    }
  }
  deleteData(id: any) {
    if (confirm('voulez-vous supprimer cet élement?'))
      this.EnginsStore.deleteEngin(id);
  }
  recherche(word: any) {
    this.EnginsStore.filterbyDesignation(word);
  }
  afficheTout() {
    this.EnginsStore.filterbyDesignation('');
  }
  PatchEventFct(row: any) {
    this.table_update_form.patchValue(
      row
    )
  }
  addEventFct() {
    this.table_update_form.reset();
  }
}