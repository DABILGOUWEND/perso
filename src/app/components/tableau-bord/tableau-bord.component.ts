import { Component, computed, effect, inject, signal } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { ClasseEnginsStore, EnginsStore, EntrepriseStore, PersonnelStore, ProjetStore, StatutStore, UserStore } from '../../store/appstore';
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
  _entreprise_store = inject(EntrepriseStore)
  _projet_store = inject(ProjetStore)
  fb = inject(NonNullableFormBuilder)

  table_update_form = this.fb.group({
    id: new FormControl(''),
    username: new FormControl('', Validators.required),
    role: new FormControl('', Validators.required),
    entreprise_id: new FormControl('', Validators.required),
    projet_id: new FormControl('', Validators.required),
  })
  displayedColumns = {
    'email': 'EMAIL',
    'username': 'USERNAME',
    'role': 'ROLE',
    'projet': 'PROJETS',
    'entreprise': 'ENTREPRISE',
    'actions': ''
  }
  titre_tableau = signal('Liste utilisateurs')
  table = computed(() => {
    let mytable =
      [
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
        {
          label: 'ENTREPRISE',
          type: 'select',
          control_name: 'entreprise_id',
          end_control_name: '',
          tableau: this.select_entreprise()
        },
        {
          label: 'PROJET',
          type: 'selectM',
          control_name: 'projet_id',
          end_control_name: '',
          tableau: this.select_projet()
        },
      ]
    return mytable
  })


  ngOnInit() {
    this._user_store.loadUsers()
    this._projet_store.loadProjets()
    this._entreprise_store.loadEntreprises()
  }
  select_entreprise=computed(()=>{
    let data=this._entreprise_store.donnees_entreprise()
  
    return data.map((value)=>{
      return {id:value.id,valeur:value.enseigne}
    })
  })
   select_projet=computed(()=>{
    let data=this._projet_store.donnees_projet()
  
    return data.map((value)=>{
      return {id:value.id,valeur:value.intitule}
    })
  })
  datasource = computed(
    () => {
    return this._user_store.users_data().map(
      (value:any) => {
        let entreprise = this._entreprise_store.donnees_entreprise().find((val: any) => val.id == value.entreprise_id)
        let projet = this._projet_store.donnees_projet().filter((val: any) =>value.projet_id.includes(val.id))
        return {
          id: value.id,
          email: value.email,
          username: value.username,
          role: value.role,
          projet_id: value.projet_id,
          entreprise_id: value.entreprise_id,
          entreprise: entreprise?.enseigne,
          projet: projet.map((val: any) => val.intitule).join(', ')
        }
      }
    )
    }
  )
    updateData(data: any) {
    let valeur = data[0]
    let current_row = data[1]
    let is_update = data[2]
    let mydata: any = []
    console.log(data)
    if (is_update) {
      mydata = {
        id: valeur.id,
        email: current_row.email,
        username: valeur.username,
        role: valeur.role,
        entreprise_id: valeur.entreprise_id,
        projet_id: valeur.projet_id

      }
      this._user_store.updateUser(mydata)

    }
    else {
      mydata = {
        id: '',
        email: current_row.email,
        username: valeur.username,
        role: valeur.role,
        entreprise_id: valeur.entreprise_id,
        projet_id: valeur.projet_id

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
