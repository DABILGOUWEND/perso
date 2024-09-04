import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ImportedModule } from '../../modules/imported/imported.module';
import { ClasseEnginsStore, EnginsStore, PointageTrvxStore, ProjetStore, TacheProjetStore, TachesEnginsStore, TachesStore, UnitesStore } from '../../store/appstore';
import { EssaiComponent } from '../essai/essai.component';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { pointage_machine } from '../../models/modeles';
import { v4 as uuidv4 } from 'uuid';
type pointMachine = {
  'tacheId': number,
  'engin_id': string,
  'duree': number
};
@Component({
  selector: 'app-pointage-trvx-engins',
  standalone: true,
  imports: [ImportedModule, SaisiComponent, EssaiComponent],
  templateUrl: './pointage-trvx-engins.component.html',
  styleUrl: './pointage-trvx-engins.component.scss'
})
export class PointageTrvxEnginsComponent implements OnInit {
  // constructor
  constructor() {
    effect(() => {

    });
  }

  // inject stores
  _pointage_trvx_store = inject(PointageTrvxStore);
  _projet_store = inject(ProjetStore);
  _engins_store = inject(EnginsStore);
  _taches_engins_store = inject(TachesEnginsStore);
  _classes_engins_store = inject(ClasseEnginsStore);
  _tachesProjetStore = inject(TacheProjetStore);

  //signals
  selected_projet_id = signal("");
  pointage_machines = signal<pointMachine[]>([]);
  duree = signal(0);
  engin = signal("");
  date = signal('03/09/2024');
  projetId = signal("");
  donnees_pointage_engins = signal<pointage_machine[]>([]);
  numeros = signal(0);

  // computed properties
  selected_pointage = computed(() => {
    return this._pointage_trvx_store.donnees_pointage_trvx();
  });
  donnees_projet = computed(() => {
    return this._projet_store.donnees_projet().map((projet) => {
      return {
        id: projet.id,
        nom: projet.intitule
      }
    });
  });

  donnees_pointage_machines = computed(() => {
    let mydata = this._pointage_trvx_store.donnees_pointage_trvx();
    let pointMac = mydata?.pointage_mach;
    let tableau: any[] = [];
    this.titre_taches.forEach(element0 => {
      let myuuid = uuidv4();
      tableau.push({
        id: myuuid,
        tache_id: element0.id,
        engin: element0.nom,
        engin_id: "",
        duree: 0,
        type: "parent"
      });
      if (pointMac) {
        let pointmach = pointMac.filter((pointage) => {
          return pointage.tache_id == element0.id
        });
        pointmach.forEach(element => {
          let engin = this._engins_store.donnees_engins().find((engin) => {
            return engin.id == element.engin_id;
          });
          tableau.push({
            id: element.id,
            tache_id: element0.id,
            engin_id: element.engin_id,
            engin: engin?.designation + " " + engin?.code_parc,
            duree: element.duree,
            type: "enfant",
          }
          )
        });
      }

    })
    return tableau;
  });

  tache_projet_Ids = computed(() => {
    return this._tachesProjetStore.taches_data().filter(x => {
      return x.projetId == this.projetId();
    }
    ).map(x => x.tacheId);
  });
  tache_projet_quantiteExec = computed(() => {
    let selected_taches_projet = this.selected_pointage()?.metre_travaux;
    return selected_taches_projet?.map(x => {
      return {
        id: x.tache_projet_id,
        quantite: x.quantite_exec
      }
    })
  }
  );

  datasource = computed(
    () => new MatTableDataSource(this.donnees_pointage_machines()),
  );

  //simples properties
  current_row = signal<any>([]);
  modif_row = signal<any>([]);
  taches_machineColumnsStr = ["engin", "duree", "actions"];
  titre_taches = [
    { id: "1", identifiant: ["E8XQLrBOG1oXBTelHa8y", "oe39MfblrBDc9ny2yEvS"], nom: "Gerbages emprunt" },
    { id: "2", identifiant: ["E8XQLrBOG1oXBTelHa8y", "itL1Zri5sjGN9bynkpUw"], nom: "Débrousaillage" },
    { id: "3", identifiant: ["oaTI4ZtWZDIs5OR6PsPN", "42TDHnqUNEu5WZKaiKzt"], nom: "Approvisionnement latérite" },
    { id: "4", identifiant: ["itL1Zri5sjGN9bynkpUw", "E8XQLrBOG1oXBTelHa8y", "42TDHnqUNEu5WZKaiKzt"], nom: "Déblais" },
    { id: "5", identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Décapage terre végétale" },
    { id: "6", identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre PST" },
    { id: "7", identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre remblais" },
    { id: "8", identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre couche de fondation" },
    { id: "9", identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre couche de base" },
    { id: "10", identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Réglage couche de base" },
    { id: "11", identifiant: ["8mjmJ2vK1X7Y6pX5zZwg"], nom: "Compactage" },
    { id: "12", identifiant: ["XpgjvqaniSlnqPoT57LG"], nom: "Arrosage" }];

  //methods

  ngOnInit() {
    this._pointage_trvx_store.loadPointageTrvx();
    this._projet_store.loadProjets();
    this._engins_store.loadengins();
    this._taches_engins_store.loadTachesEngins();
    this._classes_engins_store.loadclasses();
    this._tachesProjetStore.loadTachesProjet();
  }
  ajouter(data: any) {
    let element = this.donnees_pointage_machines().filter((pointage) =>
      pointage.tache_id == data.tache_id && pointage.type == "enfant"
    );
    if (element.length == 0) {
      this.current_row.set(data);
    }
    else {
      let lg = element.length;
      this.current_row.set(element[lg - 1]);
    }
  }
  ajout_tache() {
    let current_point_mach = this._pointage_trvx_store.donnees_pointage_trvx()?.pointage_mach;
    if (current_point_mach) {
      this._pointage_trvx_store.updatePointageMach({
        id: this.selected_pointage()?.id,
        tache_id: [...current_point_mach.map(x => x.tache_id), this.current_row().tache_id],
        engin_id: [...current_point_mach.map(x => x.engin_id), this.engin()],
        duree: [...current_point_mach.map(x => x.duree), this.duree()]
      })
    } else {

    }
    this.duree.set(0);
    this.engin.set('');
    this.current_row.set([]);
  }
  initialiser() {
    this._pointage_trvx_store.addPointageTrvx({
      projetId: this.projetId(),
      date: this.date(),
      tache_id: [],
      engin_id: [],
      duree: [],
      tache_projet_id: this.tache_projet_Ids(),
      quantite_exec: this.tache_projet_Ids().map(x => 0),
    });
  }
  modif_data() {
    this._pointage_trvx_store.updatePointageTrvx({
      id: this.selected_pointage()?.id,
      projetId: this.projetId(),
      date: this.date(),
      tache_id: this.donnees_pointage_engins().map(x => x.tache_id),
      engin_id: this.donnees_pointage_engins().map(x => x.engin_id),
      duree: this.donnees_pointage_engins().map(x => x.duree),
      tache_projet_id: this.tache_projet_Ids(),
      quantite_exec: this.tache_projet_Ids().map(x => 0),
    });
  }
  edit_element(data: any) {
    this.modif_row.set(data);
    this.duree.set(data.duree);
    this.engin.set(data.engin_id);
  }
  update_tache_engin() {
    let current_point_mach = this.selected_pointage()?.pointage_mach;
    console.log(current_point_mach)
    if (current_point_mach) {
      let duree = current_point_mach.map(item =>
        item.id == this.modif_row().id ?
          this.duree()
          : item.duree
      );
      let engin_id = current_point_mach.map(item =>
        item.id == this.modif_row().id ?
          this.engin()
          : item.engin_id
      );
      let tache_id = current_point_mach.map(item =>
        item.id == this.modif_row().id ?
          this.modif_row().tache_id
          : item.tache_id
      );

      this._pointage_trvx_store.updatePointageMach({
        id: this.selected_pointage()?.id,
        tache_id: tache_id,
        engin_id: engin_id,
        duree: duree
      })
    }
    this.modif_row.set([]);
    this.duree.set(0);
    this.engin.set('');
  }

  add_tache_engin() {
    let myuuid = uuidv4();
    this.donnees_pointage_engins.update(donnees => [...donnees,
    {
      id: myuuid,
      duree: this.duree(),
      engin_id: this.engin(),
      tache_id: this.current_row().tache_id,
    }]);
    this.modif_data()
  }
  remove_tache_engin(data: any) {
    if (confirm('voulez-vous supprimer cet élement?')) {
      let current_point_mach = this.selected_pointage()?.pointage_mach;
      if (current_point_mach) {
        let duree = current_point_mach.filter(x => x.id != data.id).map(item =>
          item.duree
        );
        let engin_id = current_point_mach.filter(x => x.id != data.id).map(item =>
          item.engin_id
        );
        let tache_id = current_point_mach.filter(x => x.id != data.id).map(item =>
          item.tache_id
        );

        this._pointage_trvx_store.updatePointageMach({
          id: this.selected_pointage()?.id,
          tache_id: tache_id,
          engin_id: engin_id,
          duree: duree
        })
      }
    }
  }
  selectedChange(data: any) {
    this.projetId.set(data);
    this._pointage_trvx_store.filtrebyProjetId(data);
    this._pointage_trvx_store.filtrebyDate(this.date());
  }
}
