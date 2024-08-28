import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ImportedModule } from '../../modules/imported/imported.module';
import { ClasseEnginsStore, EnginsStore, PointageTrvxStore, ProjetStore, TachesEnginsStore, TachesStore, UnitesStore } from '../../store/appstore';
import { EssaiComponent } from '../essai/essai.component';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { WenService } from '../../wen.service';
import e from 'express';
import { sign } from 'crypto';

type pointMachine = {
  'id': number,
  'engin_id': string,
  'duree': number,
  'niveau': string,
};
@Component({
  selector: 'app-pointage-trvx-engins',
  standalone: true,
  imports: [ImportedModule, SaisiComponent, EssaiComponent],
  templateUrl: './pointage-trvx-engins.component.html',
  styleUrl: './pointage-trvx-engins.component.scss'
})
export class PointageTrvxEnginsComponent implements OnInit {

  // inject stores
  _pointage_trvx_store = inject(PointageTrvxStore);
  _projet_store = inject(ProjetStore);
  _engins_store = inject(EnginsStore);
  _taches_engins_store = inject(TachesEnginsStore);
  _classes_engins_store = inject(ClasseEnginsStore);

  ngOnInit() {
    this._pointage_trvx_store.loadPointageTrvx();
    this._projet_store.loadProjets();
    this._engins_store.loadengins();
    this._taches_engins_store.loadTachesEngins();
    this._classes_engins_store.loadclasses();
  }

  //signals
  selected_projet_id = signal("");
  pointage_machines = signal<pointMachine[]>([]);
  duree = signal(0);
  engin = signal("");



  // computed properties
  donnees_pointage_trvx = computed(() => {

  })
  donnees_projet = computed(() => {
    return this._projet_store.donnees_projet().map((projet) => {
      return { id: projet.id, nom: projet.intitule }
    });

  });
  donnees_pointage_machines = computed(() => {
    let tableau: any[] = [];
    this.titre_taches.forEach(element0 => {
      tableau.push({
        id: element0.id,
        engin: element0.nom,
        duree: 0
      });
      let pointmach = this.pointage_machines().filter((pointage) => {
        return pointage.id == element0.id
      });
      pointmach.forEach(element => {
        let engin = this._engins_store.donnees_engins().find((engin) => {
          return engin.id == element.engin_id
        });
        tableau.push({
          id: element0.id,
          engin: engin?.designation + " " + engin?.code_parc,
          duree: element.duree
        }
        )
      });
    })
    return tableau;
  });

  datasource = computed(
    () => new MatTableDataSource(this.donnees_pointage_machines()),
  );

  //simples properties
  current_row = signal<any>([]);
  taches_machineColumnsStr = ["engin", "duree", "actions", "expand"];
  titre_taches = [
    { id: 1, identifiant: ["E8XQLrBOG1oXBTelHa8y", "oe39MfblrBDc9ny2yEvS"], nom: "Gerbages emprunt" },
    { id: 2, identifiant: ["E8XQLrBOG1oXBTelHa8y", "itL1Zri5sjGN9bynkpUw"], nom: "Débrousaillage" },
    { id: 3, identifiant: ["oaTI4ZtWZDIs5OR6PsPN", "42TDHnqUNEu5WZKaiKzt"], nom: "Approvisionnement latérite" },
    { id: 4, identifiant: ["itL1Zri5sjGN9bynkpUw", "E8XQLrBOG1oXBTelHa8y", "42TDHnqUNEu5WZKaiKzt"], nom: "Déblais" },
    { id: 5, identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Décapage terre végétale" },
    { id: 6, identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre PST" },
    { id: 7, identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre remblais" },
    { id: 8, identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre couche de fondation" },
    { id: 9, identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Mise en oeuvre couche de base" },
    { id: 10, identifiant: ["itL1Zri5sjGN9bynkpUw"], nom: "Réglage couche de base" },
    { id: 11, identifiant: ["8mjmJ2vK1X7Y6pX5zZwg"], nom: "Compactage" },
    { id: 12, identifiant: ["XpgjvqaniSlnqPoT57LG"], nom: "Arrosage" }];



  constructor() {
    effect(() => {
      console.log(this._pointage_trvx_store.donnees_pointage_trvx());
      console.log(this._projet_store.donnees_projet());
    });
  }
  //methods
  ajouter(data: any) {
    this.current_row.set(data);
  }
  ajout_tache() {
    this.pointage_machines.update((pointage) => [...pointage,
    {
      id: this.current_row().id,
      niveau: this.current_row().niveau,
      engin_id: this.engin(),
      duree: this.duree()
    }]);
    this.current_row.set([]);

  }
}
