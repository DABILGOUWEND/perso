import { Component, computed, inject, input, OnInit, output, signal, TemplateRef } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { SousTraitanceComponent } from '../sous-traitance/sous-traitance.component';
import { FormGroup } from '@angular/forms';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { FormSaisiComponent } from '../form-saisi/form-saisi.component';
import { MatTableDataSource } from '@angular/material/table';
import { DevisStore } from '../../store/appstore';

@Component({
  selector: 'app-table-devis',
  standalone: true,
  imports: [ImportedModule,SousTraitanceComponent,FormSaisiComponent],
  templateUrl: './table-devis.component.html',
  styleUrl: './table-devis.component.scss'
})
export class TableDevisComponent  implements OnInit{
  ngOnInit() {
    this.header_titles = Object.keys(this.displayedColumns())
  }
//injected stores
_devis_store = inject(DevisStore);
//signals
  is_update = signal(false);
  is_open = signal(false);
  current_row = signal([]);

  //computed
  selected_devis = computed(() => {
    return this._devis_store.current_devis()
  }); 
  
  //inputs
  titre = input.required<TemplateRef<any>>();
  table_update_form = input.required<FormGroup>();
  table = input.required<any>();
  displayedColumns = input.required<any>();
  devis_opened = input.required<boolean>();
  dataSource = input<any>({
    transform: (value:any) => new MatTableDataSource<any>(value)
  }); 
  
//outputs
  newItemEvent = output<any[]>();
  RemoveItemEvent = output<string>();
  ChangeSelectEvent = output<any[]>();
  PatchEvent = output();
  addEvent = output();

//properties
  header_titles: string[] = [];

//methods
  retourQuitter() {
    this.is_open.set(false);
    this._devis_store.setCurrentDevisId('')
  }
  modifier(row: any, id: string) {
    this._devis_store.setCurrentDevisId(row.id)
    this.current_row.set(row)
    this.is_open.set(true)
    this.is_update.set(true)
    this.PatchEvent.emit(row)
  }
  addNewItem() {
    if (this.table_update_form().valid) {
      let valeur = this.table_update_form().value
      this.newItemEvent.emit([valeur, this.current_row(), this.is_update()])
      //this.is_open.set(false)
    }

  }
  supprimer(id: string) {
    this.is_update.set(false)
    this.RemoveItemEvent.emit(id)
  }
  annuler() {
    this.is_open.set(false)
    this._devis_store.setCurrentDevisId('')
  }
  ChangeSelect(data:any,controle_name:string)
  {
    this.ChangeSelectEvent.emit([data,controle_name]);
  }
  addElement() {
    this.is_open.set(true)
    this.is_update.set(false)
    this.addEvent.emit()
  }
}
