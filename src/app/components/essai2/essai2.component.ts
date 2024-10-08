import { Component, effect, inject, OnInit } from '@angular/core';
import { WenService } from '../../wen.service';
import { ApproGasoilStore, EnginsStore, GasoilStore, TachesEnginsStore, TachesStore, UnitesStore } from '../../store/appstore';
import { ImportedModule } from '../../modules/imported/imported.module';

@Component({
  selector: 'app-essai2',
  standalone: true,
  imports: [ImportedModule],
  templateUrl: './essai2.component.html',
  styleUrl: './essai2.component.scss'
})
export class Essai2Component  {

}
