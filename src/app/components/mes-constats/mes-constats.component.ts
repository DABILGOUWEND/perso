import { Component, computed, effect, inject, OnInit, signal } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { DevisStore, SstraitantStore, UnitesStore } from '../../store/appstore';
import { element_devis, ExampleFlatNode2 } from '../../models/modeles';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AuthenService } from '../../authen.service';
import { BehaviorSubject } from 'rxjs';
import { UnitesPipe } from '../../unites.pipe';

@Component({
  selector: 'app-mes-constats',
  standalone: true,
  imports: [ImportedModule, UnitesPipe],
  templateUrl: './mes-constats.component.html',
  styleUrl: './mes-constats.component.scss'
})
export class MesConstatsComponent implements OnInit {
  //injections
  _devis_store = inject(DevisStore);
  _auth_service = inject(AuthenService);
  _ssTraitance_store = inject(SstraitantStore);
  _unit_store = inject(UnitesStore);


  //signals properties
  current_devis_id = signal('');
  current_constat = signal(0);
  numero_constat = signal(0);


  //computed properties
  data_loaded = computed(() => this._devis_store.donnees_currentDevis()?.data)
  
  liste_devis = computed(() => {
    let donnees: any = []
    this._devis_store.donnees_devis().forEach(ent => {
      let entreprise = this._ssTraitance_store.donnees_sstraitant().find(e => e.id == ent.entreprise_id);
      donnees.push({
        id: ent.id,
        entreprise: entreprise ? entreprise.enseigne : ''
      });
    })
    return donnees;

  })
  liste_unites = computed(() => {
    return this._unit_store.unites_data()
  })


  //current properties 

  displayedColumns = ['poste', 'designation', 'unite', 'prix_u', 'quantite', 'quantite_prec', 'quantite_periode', 'quantite_cumul', 'actions'];
  nestedNodeMap = new Map<element_devis, ExampleFlatNode2>();
  flatNodeMap = new Map<ExampleFlatNode2, element_devis>();
  transformer = (node: element_devis, level: number) => {
    const existingNode = this.nestedNodeMap.get(node);
    const flatNode = existingNode && (existingNode.poste === node.poste

    )
      ? existingNode
      : {
        poste: node.poste,
        designation: node.designation,
        prix_u: node.prix_u,
        unite: node.unite,
        quantite: node.quantite,
        expandable: !!node.children && node.children.length > 0,
        level: level,
        quantite_prec: null,
        quantite_periode: null,
        quantite_cumul: null,

      };
    flatNode.poste = node.poste;
    flatNode.designation = node.designation;
    flatNode.prix_u = node.prix_u;
    flatNode.unite = node.unite;
    flatNode.quantite = node.quantite;
    flatNode.expandable = !!node.children && node.children.length > 0;
    flatNode.level = level;
    flatNode.quantite_prec = null;
    flatNode.quantite_periode = null;
    flatNode.quantite_cumul =null;


    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }
  treeControl = new FlatTreeControl<ExampleFlatNode2>(
    node => node.level, node => node.expandable);
  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children
  );
  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  constructor() {
    effect(() => {
      let data = this._devis_store.donnees_currentDevis()?.data;
      this.init_dat(data);
    }
    )
  }

  // methods
  ngOnInit() {
    this._devis_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/devis');
    this._ssTraitance_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/sous_traitants');
    this._unit_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/unites');
    this._devis_store.loadDevis();
    this._ssTraitance_store.loadSstraitants();
    this._unit_store.loadUnites();

  }

  init_dat(data: element_devis[] | undefined) {
console.log(JSON.stringify(data))
    if (data) {
      let children = data[0].children;
      let sorting = children.sort((a, b) => a.poste.localeCompare(b.poste))
      data[0].children = sorting;
      this.dataSource.data = data;
      this.treeControl.expandAll();
      for (let node of this.treeControl.dataNodes) {
        if (!node.expandable) {
          let flatenNode = this.flatNodeMap.get(node);
          if (flatenNode) {
            let constat = flatenNode.constat;
            if (constat.length > 0) {
              let numeros = constat.map(c => c.numero)
              let ind = numeros.indexOf(this.current_constat());
              if (ind > -1) {
                node.quantite_periode = constat[ind].quantite_periode;
              }
              else {
                node.quantite_periode = 0;
              }
              let quantites_prec = constat.filter(x => x.numero < this.current_constat()).map(c => c.quantite_periode);
              if (quantites_prec.length > 0) {
                node.quantite_prec = quantites_prec.reduce((a, b) => a + b);
              } else {
                node.quantite_prec = 0;
              }
              node.quantite_cumul = node.quantite_prec + node.quantite_periode;
            }
          }
        }

      }
    }


  }
  new_constat() {
    let numero_constat = []
    for (let node of this.treeControl.dataNodes) {
      let flatenNode = this.flatNodeMap.get(node);
      if (flatenNode) {
        let constat = flatenNode.constat;
        if (constat.length > 0) {
          let numeros = constat.map(c => c.numero)
          let max_numero = Math.max(...numeros);
          numero_constat.push(max_numero)
        }
      }
    }
    this.numero_constat.set(numero_constat.length > 0 ? Math.max(...numero_constat) + 1 : 1);
    this.current_constat.set(this.numero_constat());
  }
  getLevel = (node: ExampleFlatNode2) => node.level
  getParentNode(node: ExampleFlatNode2): ExampleFlatNode2 | undefined {
    const currentLevel = this.getLevel(node);
    if (currentLevel < 1) {
      return undefined;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (this.getLevel(currentNode) < currentLevel) {
        return currentNode;
      }
    }
    return undefined;
  }
  selecteDevis(devis_id: string) {
    this.numero_constat.set(0);
    this._devis_store.setCurrentDevisId(devis_id)
  }
  next_constat() {
    this.current_constat.update(x=>x+1);
  }
  previous_constat() {
    this.current_constat.update(x=>x-1);
  }
}
