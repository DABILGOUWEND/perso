import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { FormControl, Validators, NonNullableFormBuilder } from '@angular/forms';
import { ImportedModule } from '../../modules/imported/imported.module';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { ClasseEnginsStore, CompteStore, EnginsStore, PersonnelStore, StatutStore } from '../../store/appstore';
import { EssaiComponent } from '../essai/essai.component';


@Component({
  selector: 'app-engins',
  standalone: true,
  imports: [ImportedModule, SaisiComponent, EssaiComponent],
  templateUrl: './engins.component.html',
  styleUrl: './engins.component.scss'
})
export class EnginsComponent implements OnInit {
  EnginsStore = inject(EnginsStore);
  personnel_store = inject(PersonnelStore);
  classeEngins_store = inject(ClasseEnginsStore);
  statut_store = inject(StatutStore);
  _compte_store = inject(CompteStore);
  fb = inject(NonNullableFormBuilder)
  table_update_form = this.fb.group({
    id: new FormControl(''),
    designation: new FormControl('', Validators.required),
    code_parc: new FormControl('', Validators.required),
    utilisateur_id: new FormControl('', Validators.required),
    classe_id: new FormControl('', Validators.required),
    immatriculation: new FormControl(''),
  })
  displayedColumns = {
    'classe': 'CLASSE',
    'designation': 'DESIGNATION',
    'code_parc': 'CODE PARC',
    'immatriculation': 'IMMATRICULATION',
    'utilisateur': 'UTILISATEUR',
    'actions': ''
  }
  titre_tableau = signal('Liste du matériel')
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
    this._compte_store.classes_engins()
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
    this._compte_store.donnees_personnel()
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
      this._compte_store.donnees_engins().forEach(element => {
        let classe = this._compte_store.donnees_classesEngins().find(x => x.id == element.classe_id)
        let utilisat = this._compte_store.donnees_personnel().find(x => x.id == element.utilisateur_id)
         
        donnees.push(
          {
            'id': element.id,
            'designation': element.designation,
            'code_parc': element.code_parc,
            'immatriculation': element.immatriculation,
            'classe': classe?.designation,
            'classe_id': element.classe_id,
            'utilisateur': utilisat?.nom + ' ' + utilisat?.prenom,
            'utilisateur_id': element.utilisateur_id
          }
        )
      });
      return donnees
    }
  );
  ngOnInit() {
    this._compte_store.loadData();
  }
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
      }
      this._compte_store.updateEnginsCompte(mydata)

    }
    else {
      mydata = {
        id: '',
        designation: valeur.designation,
        code_parc: valeur.code_parc,
        immatriculation: valeur.immatriculation,
        classe_id: valeur.classe_id,
        utilisateur_id: valeur.utilisateur_id,
      }
      this._compte_store.addEngins(mydata)
    }
  }
  deleteData(id: any) {
    if (confirm('voulez-vous supprimer cet élement?'))
      this._compte_store.deleteEnginCompte(id)
  }
  recherche(word: any) {
    this.EnginsStore.filterbyDesignation(word)
  }
  afficheTout() {
    this.EnginsStore.filterbyDesignation('')
  }
  PatchEventFct(row: any) {
    this.table_update_form.patchValue(
      row
    )
  }
  addEventFct() {
    this.table_update_form.reset()
  }
}