import { Component, EventEmitter, input, Input, OnInit, Output } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-saisi',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './form-saisi.component.html',
  styleUrl: './form-saisi.component.scss'
})
export class FormSaisiComponent implements OnInit {

  label = input.required<string>();
  required_error = input<string>();
  type = input.required<string>();
  parent_FG = input.required<FormGroup>();
  control_name = input.required<string>();
  tableau = input<any>();
  @Output() ChangeSelectEvent = new EventEmitter()
  @Output() RadioButtonEvent = new EventEmitter()

  invalid_error: string = 'Donnée invalide.';
  placeholder = input<string>();
  control!: AbstractControl;
  control2!: AbstractControl;
  @Input() enddate_control_name: string;

  ngOnInit() {
    this.control = this.parent_FG().get(this.control_name()) as AbstractControl;
    //check if required validator
    if (!!this.control.validator) {
      let validators = this.control.validator({} as AbstractControl);
     
    }
    //update the invalid error for date fields
    if (this.type() == 'date' || this.type() == 'daterange') {
      this.invalid_error = 'svp utiliser le format MM/DD/YYYY.';
    }
  }

  selectChange(data: any) {
    this.ChangeSelectEvent.emit(data)
  }
  radio_button_event(data: any) {
    this.RadioButtonEvent.emit(data)
  }
}
