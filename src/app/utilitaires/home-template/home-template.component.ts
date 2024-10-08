import { NgTemplateOutlet } from '@angular/common';
import { Component, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';

@Component({
  selector: 'app-home-template',
  standalone: true,
  imports: [NgTemplateOutlet, ImportedModule],
  templateUrl: './home-template.component.html',
  styleUrl: './home-template.component.scss'
})
export class HomeTemplateComponent {
  @Input() nav_liste: TemplateRef<any>;
  @Input() toolbar: TemplateRef<any>;
  @Input() content: TemplateRef<any>;

}
