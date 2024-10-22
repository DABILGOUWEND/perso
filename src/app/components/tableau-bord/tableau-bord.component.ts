import { Component, computed, effect, inject, signal } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { ClasseEnginsStore, EnginsStore, PersonnelStore, StatutStore, UserStore } from '../../store/appstore';
import { NonNullableFormBuilder, FormControl, Validators } from '@angular/forms';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { EssaiComponent } from '../essai/essai.component';

@Component({
  selector: 'app-tableau-bord',
  standalone: true,
  imports: [ImportedModule, SaisiComponent, EssaiComponent],
  templateUrl: './tableau-bord.component.html',
  styleUrl: './tableau-bord.component.scss'
})
export class TableauBordComponent {
  constructor() {
    effect(() => {
      // console.log(this.personnel_store.personnel_data())   
    }
    )
  }

  EnginsStore = inject(EnginsStore)
  personnel_store = inject(PersonnelStore)
  classeEngins_store = inject(ClasseEnginsStore)
  statut_store = inject(StatutStore)
  _user_store = inject(UserStore)
  fb = inject(NonNullableFormBuilder)

  table_update_form = this.fb.group({
    id: new FormControl(''),
    email: new FormControl('', Validators.required),
    username: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
  })
  displayedColumns = {
    'email': 'EMAIL',
    'username': 'USERNAME',
    'role': 'ROLE',
    'actions': ''
  }
  titre_tableau = signal('Liste utilisateurs')
  table = computed(() => {
    let mytable =
      [
        {
          label: 'EMAIL',
          type: 'text1',
          control_name: 'email',
          end_control_name: '',
          tableau: []
        }
        ,

        {
          label: 'USERNAME',
          type: 'text1',
          control_name: 'username',
          end_control_name: '',
          tableau: []
        },
        {
          label: 'ROLE',
          type: 'select',
          control_name: 'role',
          end_control_name: '',
          tableau: [{
            id: 'admin',
            valeur: 'administrateur'
          },
          {
            id: 'user1',
            valeur: 'gestion'
          },
          {
            id: 'user2',
            valeur: 'travaux'
          }
          ]
        },
      ]
    return mytable
  })


  ngOnInit() {
    this._user_store.loadUsers()
  }
  updateData(data: any) {
    let valeur = data[0]
    let current_row = data[1]
    let is_update = data[2]
    let mydata: any = []
    if (is_update) {
      mydata = {
        id: valeur.id,
        email: valeur.email,
        username: valeur.username,
        role: valeur.role,

      }
      this._user_store.updateUser(mydata)

    }
    else {
      mydata = {
        id: '',
        email: valeur.email,
        username: valeur.username,
        role: valeur.role,

      }
      this._user_store.updateUser(mydata)
    }
  }
  deleteData(id: any) {
    if (confirm('voulez-vous supprimer cet élement?'))
      this._user_store.removeUser(id)
  }
  recherche(word: any) {
    //this.personnel_store.filterbyNomPrenom(word)
  }
  afficheTout() {
    //this.personnel_store.filterbyNomPrenom('')
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
