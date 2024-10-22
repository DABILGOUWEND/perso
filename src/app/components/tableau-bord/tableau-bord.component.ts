import { Component, computed, effect, inject, signal } from '@angular/core';
import { ImportedModule } from '../../modules/imported/imported.module';
import { ClasseEnginsStore, EnginsStore, EntrepriseStore, PersonnelStore, ProjetStore, StatutStore, TachesStore, UnitesStore, UserStore } from '../../store/appstore';
import { NonNullableFormBuilder, FormControl, Validators } from '@angular/forms';
import { SaisiComponent } from '../../utilitaires/saisi/saisi.component';
import { EssaiComponent } from '../essai/essai.component';
import { TbordUsersComponent } from '../tbord-users/tbord-users.component';

@Component({
  selector: 'app-tableau-bord',
  standalone: true,
  imports: [TbordUsersComponent],
  templateUrl: './tableau-bord.component.html',
  styleUrl: './tableau-bord.component.scss'
})
export class TableauBordComponent {

}
