import { FlatTreeControl } from '@angular/cdk/tree';
import { Component, inject, model, OnInit, signal } from '@angular/core';
import { MatTreeFlattener, MatTreeFlatDataSource } from '@angular/material/tree';
import { Devis, element_devis } from '../../models/modeles';
import { ImportedModule } from '../../modules/imported/imported.module';
import { TaskService } from '../../task.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { posix } from 'node:path/posix';
import { SelectionModel } from '@angular/cdk/collections';
import { expand, Observable } from 'rxjs';
import { child } from 'firebase/database';
import e from 'express';

interface ExampleFlatNode {
  expandable: boolean,
  poste: string,
  designation: string,
  prix_u: number | undefined,
  unite: string | undefined,
  quantite: number | undefined,
  level: number,
  montant: number | undefined,
}


@Component({
  selector: 'app-lignedevis',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './lignedevis.component.html',
  styleUrl: './lignedevis.component.scss'
})
export class LignedevisComponent implements OnInit {
  flatNodeMap = new Map<ExampleFlatNode, element_devis>();

  /** Map from nested node to flattened node. This helps us to keep the same object for selection */
  nestedNodeMap = new Map<element_devis, ExampleFlatNode>();


  //signal
  is_table_updated = signal(false);
  is_table_opened = signal(false);

  selected_row = signal<element_devis | undefined>(undefined);

  displayedColumns = ['poste', 'designation', 'prix_u', 'unite', 'quantite', 'montant', 'actions'];

  constructor(private taskService: TaskService, private fb: FormBuilder) {
    this.table_update_form = this.fb.group({
      poste: new FormControl('', [Validators.required]),
      designation: new FormControl('', [Validators.required]),
      prix_u: new FormControl(0),
      unite: new FormControl(''),
      quantite: new FormControl(0),
    });
    this.taskService.dataChange.subscribe((data: element_devis[]) => {
      this.dataSource.data = data;
      /*    for (let i = 0; i < this.treeControl.dataNodes.length; i++) {
           let letNested=this.treeControl.dataNodes[i];
           let child = this.flatNodeMap.get(letNested)?.children;
           if (child) {
             if(child?.length>0) {
               let montant = child.map(c=>{
                 let flaten=this.nestedNodeMap.get(c)
                 return flaten?.montant?flaten.montant:0;
               }).reduce((a,b)=>a+b);  
               letNested.montant=montant;
             }
           }
         }  */
      this.treeControl.expandAll();
      for (let i = this.treeControl.dataNodes.length - 1; i >= 0; i--) {
        let parent = this.getParentNode(this.treeControl.dataNodes[i]);
        if (parent) {
          let montantNode = this.treeControl.dataNodes[i].montant;
          let montantNodeExist = parent.montant;
          let parentmont = (montantNodeExist ? montantNodeExist : 0) + (montantNode ? montantNode : 0);
          parent.montant = parentmont;
        }
      }
    });
  }
  table_update_form: FormGroup
  data_source = signal<element_devis[]>([]);
  ngOnInit() {

  }

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
        montant: 0
      };
    flatNode.poste = node.poste;
    flatNode.designation = node.designation;
    flatNode.prix_u = node.prix_u;
    flatNode.unite = node.unite;
    flatNode.quantite = node.quantite;
    flatNode.expandable = !!node.children && node.children.length > 0;
    flatNode.level = level;

    if (node.children.length == 0) {

      flatNode.montant = (node.prix_u ? node.prix_u : 0) * (node.quantite ? node.quantite : 0);
    }
    this.flatNodeMap.set(flatNode, node);
    this.nestedNodeMap.set(node, flatNode);
    return flatNode;
  }

  treeControl = new FlatTreeControl<ExampleFlatNode>(
    node => node.level, node => node.expandable);


  treeFlattener = new MatTreeFlattener(
    this.transformer, node => node.level, node => node.expandable, node => node.children);

  dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

  updateTableData() {
    if (this.table_update_form.valid) {
      let row = this.selected_row();
      let data = this.table_update_form.value;
      if (this.is_table_updated()) {
        if (row) {
          row.poste = data.poste;
          row.designation = data.designation;
          if (data.prix_u != null)
            row.prix_u = data.prix_u;
          if (data.unite)
            row.unite = data.unite;
          if (data.quantite != null)
            row.quantite = data.quantite;
        }
      } else {
        if (row) {
          let child =
          {
            poste: data.poste,
            designation: data.designation,
            prix_u: data.prix_u,
            unite: data.unite,
            quantite: data.quantite,
            children: []
          }
          row.children.push(child);
          row.unite='';
          row.prix_u=0
          row.quantite=0
   
        }
        

      }
       this.taskService.saveDevis(this.taskService.data_element(), 'fnkIccTSY0o5bE3Dvdco').subscribe(
        {
          next: () => {
            this.treeControl.expandAll();
          }
        }
      ) 

      this.taskService.dataChange.next(this.taskService.data_element());

    }
    this.is_table_opened.set(false);
  }
  annuler() {
    this.is_table_opened.set(false);
  }

  modif(data: any) {
    let dataf = this.flatNodeMap.get(data);

    this.is_table_opened.set(true);

    this.selected_row.set(this.flatNodeMap.get(data));
    this.is_table_updated.set(true);
    this.table_update_form.patchValue(data);
  }
  addrow(data: ExampleFlatNode) {
    console.log(data);
    if ( data.prix_u && data.quantite) {
      if (confirm('la création d\'une ligne fille modifiera le montant de la ligne parente, voulez-vous continuer?')) { 
        this.is_table_opened.set(true);
        this.selected_row.set(this.flatNodeMap.get(data));
        this.table_update_form.reset();
        this.is_table_updated.set(false);
      }
    } else {
      this.is_table_opened.set(true);
      this.selected_row.set(this.flatNodeMap.get(data));
      this.table_update_form.reset();
      this.is_table_updated.set(false);
    }


  }
  delete(node: ExampleFlatNode) {
    if (confirm('Voulez-vous vraiment supprimer cette ligne?')) {
      let nodeFlat = this.flatNodeMap.get(node);
      if (nodeFlat) {
        const parentNode = this.getParentNode(node);
        if (parentNode) {
          let parentFlat = this.flatNodeMap.get(parentNode);
          if (!parentFlat || nodeFlat.children.length > 0) {
            alert('Impossible de supprimer la ligne car elle contient des lignes filles');
          } else {
            parentFlat.children = parentFlat.children.filter(c => c.poste !== node.poste);
            this.taskService.dataChange.next(this.taskService.data_element());
            this.taskService.saveDevis(this.taskService.data_element(), 'fnkIccTSY0o5bE3Dvdco').subscribe()
            this.treeControl.expand(node);

          }
        } else {
          alert('Impossible de supprimer la ligne car elle est la racine');

        }
      }

    }
  }
  public getLevel = (node: ExampleFlatNode) => node.level

  public getParentNode(node: ExampleFlatNode): ExampleFlatNode | undefined {
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
}

