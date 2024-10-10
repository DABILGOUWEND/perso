import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, WritableSignal, computed, input, output, signal } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ImportedModule } from '../../modules/imported/imported.module';
import { FormSaisiComponent } from '../form-saisi/form-saisi.component';
import { ModelComponent } from '../model/model.component';
import { ApprogoComponent } from '../approgo/approgo.component';

@Component({
  selector: 'app-gasoil-model',
  standalone: true,
  imports: [ImportedModule, FormSaisiComponent, ModelComponent,ApprogoComponent],
  templateUrl: './gasoil-model.component.html',
  styleUrl: './gasoil-model.component.scss'
})
export class GasoilModelComponent implements OnInit {
  appro_opened=input.required<boolean>();
  appro_openedEmit=output();
  appro_closedEmit=output();
  is_update = signal(false);
  is_open=signal(false);
  current_row: WritableSignal<any> = signal([]);
  @Input() titre: TemplateRef<any>;
  @Input() conso: TemplateRef<any>;
  @Input() table_update_form: FormGroup;
  @Input() table: any;
  @Input() displayedColumns: any;
  @Input() dataSource: any;
  @Output() newItemEvent = new EventEmitter<any>();
  @Output() RemoveItemEvent = new EventEmitter<any>();
  @Output() RechercheEvent = new EventEmitter<any>();
  @Output() AfficheToutEvent = new EventEmitter();
  @Output() ChangeSelectEvent = new EventEmitter();
  @Output() PatchEvent = new EventEmitter();
  @Output() addEvent = new EventEmitter();
  @Output() printEvent = new EventEmitter();
  header_titles: string[] = [];
  donnees_table = computed(() => {
    return new MatTableDataSource<any>(this.dataSource())
  })
  ngOnInit() {
    this.header_titles = Object.keys(this.displayedColumns)
  }
  modifier(row: any, id: string) {
    this.current_row.update(() => row)
    this.is_open.set(true)
    this.is_update.set(true)
    this.PatchEvent.emit(row)
  }
  addNewItem() {
    if (this.table_update_form.valid) {
      let valeur = this.table_update_form.value
      this.newItemEvent.emit([valeur, this.current_row(), this.is_update()])
      this.is_open.set(false)
    }

  }
  supprimer(id: string) {
    this.is_update.set(false)
    this.RemoveItemEvent.emit(id)
  }
  annuler() {
    this.is_open.set(false)
  }
  addElement() {

    this.is_open.set(true)
    this.is_update.set(false)
    this.addEvent.emit()
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.RechercheEvent.emit(filterValue)
  }
  affichertout() {
    this.AfficheToutEvent.emit()
  }
  ChangeSelect(data: any, controle_name: any) {
    this.ChangeSelectEvent.emit([data, controle_name])
  }


  annuler2() {
    this.appro_closedEmit.emit();
  }
  ouvrir_appro() {
   this.appro_openedEmit.emit();
  }

  printElement() {
    this.printEvent.emit();
  }
  retourQuitter()
  {
    this.appro_closedEmit.emit()
  }
}
