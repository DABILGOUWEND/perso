import { APP_ID, Component, computed, effect, EventEmitter, inject, OnInit, Output, signal } from '@angular/core';
import { ApproGasoilStore, ClasseEnginsStore, CompteStore, EnginsStore, EntrepriseStore, GasoilStore, PannesStore, PersonnelStore, ProjetStore, UserStore } from '../../store/appstore';
import { AuthenService } from '../../authen.service';
import { ImportedModule } from '../../modules/imported/imported.module';
import { Router, RouterOutlet } from '@angular/router';
import { concat, forkJoin, Observable, tap } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { v4 as uuid } from 'uuid';
import { TaskService } from '../../task.service';
import { WenService } from '../../wen.service';
import { EnginsComponent } from '../engins/engins.component';
import { Auth, authState } from '@angular/fire/auth';
import { HomeTemplateComponent } from '../../utilitaires/home-template/home-template.component';
export const APP_Is = 'AIzaSyBsK6a4cgI9g94bdY050vnuI3BP3ejiiXE';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ImportedModule, RouterOutlet, HomeTemplateComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  _projet_store = inject(ProjetStore);
  //methods
  ngOnInit() {
    this._projet_store.loadProjets();
  }
}
