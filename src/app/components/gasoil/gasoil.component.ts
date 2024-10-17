import { Component, ViewChild, computed, effect, inject, signal } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Engins } from '../../models/modeles';
import { GasoilStore, EnginsStore, ClasseEnginsStore, ApproGasoilStore, CompteStore, PannesStore, PersonnelStore, ProjetStore } from '../../store/appstore';
import { ImportedModule } from '../../modules/imported/imported.module';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { ApprogoComponent } from '../approgo/approgo.component';
import { EssaiComponent } from '../essai/essai.component';
import { WenService } from '../../wen.service';
import { GasoilModelComponent } from '../gasoil-model/gasoil-model.component';
import { GasoilService } from '../../services/gasoil.service';
import { TaskService } from '../../task.service';
@Component({
  selector: 'app-gasoil',
  standalone: true,
  imports: [ImportedModule, SaisiComponent, ApprogoComponent, EssaiComponent, GasoilModelComponent],
  templateUrl: './gasoil.component.html',
  styleUrl: './gasoil.component.scss'
})
export class GasoilComponent {
  //injections
  _engins_store = inject(EnginsStore);
  _classe_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projet_store = inject(ProjetStore);
  _compte_store = inject(CompteStore);
  _task_service = inject(TaskService);
  _pannes_store = inject(PannesStore);
  _gasoil_store = inject(GasoilStore);
  _appro_go = inject(ApproGasoilStore);
  _service: WenService = inject(WenService);
  fb = inject(NonNullableFormBuilder);
  _gasoil_service = inject(GasoilService);

  //signal variables
  selected_compteur = signal("");
  madate = signal("");
  selected_engin_id = signal("");
  selected_classe_id = signal("");
  selectEnginName = signal("");
  selectClasseName = signal("");
  default_date = signal(new Date());
  is_click_choix = signal(true);
  floatLabelControl = new FormControl("tout");
  date_choice = signal("tout");
  selectedEngin = signal<Engins | undefined>(undefined);
  titre_tableau = signal("Gestion du gasoil");
  appro_opened = signal(false)

  //others variables and consts
  formG2: FormGroup;
  displayedColumns: any = {
    'date': 'DATE',
    'designation': 'DESIGNATION',
    'code_parc': 'CODE PARC',
    'compteur': 'COMPTEUR',
    'quantite_go': 'QUANTITE GO',
    'actions': ''
  }
  popuplist = [
    {
      'value': "ok",
      'titre': 'Compteur Ok'
    },
    {
      'value': "panne",
      'titre': 'Compteur panne'
    }
  ]
  @ViewChild(MatPaginator) paginator: MatPaginator
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator2: MatPaginator
  @ViewChild(MatSort) sort2: MatSort;

  //computed signal

  donnees_enginsByclass = computed(() => {
    if (this.selected_classe_id() === "") {
      return this._engins_store.donnees_engins();
    }
    else {
      return this._engins_store.donnees_engins().
        filter(x => x.classe_id === this.selected_classe_id());
    }
  }
  );
  table = computed(() => {
    return [
      {
        label: 'situation panne',
        type: 'radio',
        control_name: 'situation_cp',
        end_control_name: '',
        tableau: [],
        radio_button_tab: this.popuplist
      },
      {
        label: 'DATE',
        type: 'date',
        control_name: 'date',
        end_control_name: '',
        tableau: [],
        radio_button_tab: []
      },
      {
        label: 'CLASSE MATERIEL',
        type: 'select',
        control_name: 'classe_id',
        end_control_name: '',
        tableau: this.classe_select(),
        radio_button_tab: []
      },
      {
        label: 'CODE PARC',
        type: 'select',
        control_name: 'engin_id',
        end_control_name: '',
        tableau: [],
        radio_button_tab: []
      },
      {
        label: 'DESIGNATION',
        type: 'text1',
        control_name: 'designation',
        end_control_name: '',
        tableau: [],
        radio_button_tab: []
      },
      {
        label: 'QUANTITE GO',
        type: 'number',
        control_name: 'quantite_go',
        end_control_name: '',
        tableau: [],
        radio_button_tab: []
      },
      {
        label: 'COMPTEUR',
        type: 'number',
        control_name: 'compteur',
        end_control_name: '',
        tableau: [],
        radio_button_tab: []
      }
    ]
  })
  classe_select = computed(() => {
    let donnees: any = [];
    return this._classe_store.classes_engins().map(x => {
      return {
        'id': x.id,
        'valeur': x.designation
      }
    })

  })
  total_conso = computed(() => {
    let go = this._gasoil_store.datasource().map((x: any) => x.quantite_go);
    return this._service.somme(go)
  });
  table_update_form = this.fb.group({
    id: new FormControl(),
    numero: new FormControl(),
    classe_id: new FormControl("", Validators.required),
    engin_id: new FormControl("", Validators.required),
    date: new FormControl(new Date(), Validators.required),
    designation: new FormControl({ value: "", disabled: true }, Validators.minLength(2)),
    compteur: new FormControl(""),
    quantite_go: new FormControl("", [Validators.required, Validators.min(1)])
  })
  constructor(
    private _fb: FormBuilder,
  ) {
    this.formG2 = this._fb.group({
      date_debut: new FormControl(new Date(), Validators.required),
      date_fin: new FormControl(new Date(), Validators.required)
    });
    effect(() => {
    })
  }
  ngOnInit() {
    this.default_date.set(new Date());
    this.madate.set(new Date().toLocaleDateString());
    this._engins_store.loadengins
    this._gasoil_store.loadconso();
    this._appro_go.loadappro();
    this._gasoil_store.setCurrentDate(this.madate());
    this._gasoil_service.chartOptions().data[0].dataPoints = this._gasoil_store.historique_consogo()[0];
  }
  addEvent(event: MatDatepickerInputEvent<any>) {
    this.default_date.set(event.value);
    this.madate.set(event.value.toLocaleDateString());
    this._gasoil_store.filtrebyDate([this.madate()]);
  }
  annuler() {
    this.table_update_form.reset();
  }
  choix_date() {
    let cas = this.floatLabelControl.value;
    switch (cas) {
      case "date":
        this.date_choice.set("date");
        this._gasoil_store.filtrebyDate([this.madate()]);
        this._gasoil_store.setCurrentDate(this.madate());
        break
      case "idate":
        this.date_choice.set("idate");
        if (this.formG2.valid) {
          let value = this.formG2.value;
          this._gasoil_store.filtrebyDate([value.date_debut.toLocaleDateString(), value.date_fin.toLocaleDateString()])
        }
        break
      case "tout":
        this.date_choice.set("tout");
        this._gasoil_store.filtrebyDate([""])
        break
    }
  }
  dateRangeChange() {
    if (this.formG2.valid) {
      let value = this.formG2.value;
      if (value.date_debut !== null && value.date_fin !== null) {
        this._gasoil_store.filtrebyDate(
          [value.date_debut.toLocaleDateString(),
          value.date_fin.toLocaleDateString()
          ]
        )
      }
    }
  }
  updateData(data: any) {
    let valeur = data[0];
    let is_update = data[2];
    if (is_update) {
      let val_tr =
      {
        id: valeur.id,
        engin_id: valeur.id_engin,
        date: valeur.date.toLocaleDateString(),
        quantite_go: valeur.quantite_go,
        diff_work: 0,
        numero: valeur.numero,
        compteur: valeur.compteur !== null ? valeur.compteur.toString() : "0",
      }
      this._gasoil_store.updateconso(val_tr)
    }
    else {
      let val_tr =
      {
        engin_id: valeur.id_engin,
        date: valeur.date.toLocaleDateString(),
        quantite_go: valeur.quantite_go,
        compteur: valeur.compteur !== null ? valeur.compteur.toString() : "0",
        diff_work: 0,
        numero: (this._gasoil_store.lastNum() + 1)
      }
      this._gasoil_store.addconso(val_tr);
    }
  }
  deleteData(id: any) {
    if (confirm('voulez-vous supprimer cet élement?'))
      this._gasoil_store.removeconso(id)
  }
  changeSelect(data: any) {
    let controle_name = data[1];
    this.selectedEngin.set(undefined);
    let ind = this.table().findIndex(x => x.control_name === "engin_id")
    switch (controle_name) {
      case "classe_id":
        let classe_id = data[0]
        let tab = this._engins_store.donnees_engins().filter(x => x.classe_id === classe_id).map(x => {
          return {
            'id': x.id,
            'valeur': x.code_parc
          }
        })
        this.table()[ind].tableau = tab;
        this.table_update_form.get("designation")?.setValue('');
        break
      case "engin_id":
        let id = data[0]
        let engin = this._engins_store.donnees_engins().find(x => x.id === id);
        this.selectedEngin.set(engin);
        if (engin)
          this.table_update_form.get("designation")?.setValue(engin?.designation)
    }
  }
  PatchEventFct(row: any) {
    if (Number(row.compteur) > 0) {
      this.selected_compteur.set("ok");
    }
    else {
      this.selected_compteur.set("panne");
      this.table_update_form.get("compteur")?.setValue("0");
    }
    let ind = this.table().findIndex(x => x.control_name === "engin_id")
    let tab = this._engins_store.donnees_engins().
      filter(x => x.classe_id === row.classe_id).map(x => {
        return {
          'id': x.id,
          'valeur': x.code_parc
        }
      }
      )
    this.table()[ind].tableau = tab;
    let dates = this._service.convertDate(row.date);
    row.date = dates;
    this.table_update_form.patchValue(
      row
    )
  }
  addEventFct() {
    this.table_update_form.reset();
    this.selected_compteur.set("ok");
    let dates = new Date();
    this.table_update_form.get("date")?.setValue(dates);
  }

  selectChangeEngin(data: any) {
    let engin = this._engins_store.donnees_engins().find(x => x.id === data);
    if (engin) {
      this.selectEnginName.set(engin.designation + " - " + engin.code_parc);
    } else {
      this.selectEnginName.set("");
    }

    this._gasoil_store.filterByEnginId(this.selected_engin_id());
  }
  selectChangeEnginByclass(data: any) {
    let classe = this._classe_store.classes_engins().find(x => x.id === data)
    if (classe) {
      this.selectClasseName.set(classe.designation);
    }
    else {
      this.selectClasseName.set("");
    }
    this._gasoil_store.filterByClassId(this.selected_classe_id());
  }
  printgasoil() {
    this._gasoil_service.rapport_gasoil(
      this.date_choice(),
      this._gasoil_store.datasource(),
      this.selectClasseName(),
      this.selectEnginName(),
      this.total_conso()
    )
  }
  open_appro() {
    this.appro_opened.set(true);
  }
  close_appro() {
    this.appro_opened.set(false);
  }
}
