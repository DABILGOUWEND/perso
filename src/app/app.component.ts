import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Auth } from '@angular/fire/auth';
import { ImportedModule } from './modules/imported/imported.module';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  
  constructor() {
 
  }
  ngOnInit() {
}
}
