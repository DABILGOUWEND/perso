import { Component, effect, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { Auth } from '@angular/fire/auth';
import { ImportedModule } from './modules/imported/imported.module';
import { eleves_store } from './store/appstore';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ImportedModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  constructor() { 
    effect(()=>console.log(this.eleves_store.data_eleve()))
  }
 eleves_store=inject(eleves_store)
  ngOnInit() {
    this.eleves_store.loadEleves( )
}
}
