import { Component, effect, inject, OnInit } from '@angular/core';
import { WenService } from '../../wen.service';
import { ApproGasoilStore, EnginsStore, GasoilStore, TachesStore, UnitesStore } from '../../store/appstore';

@Component({
  selector: 'app-essai2',
  standalone: true,
  imports: [],
  templateUrl: './essai2.component.html',
  styleUrl: './essai2.component.scss'
})
export class Essai2Component  implements OnInit{

  constructor()
  {
    effect(()=>{
    console.log(this.enginsstore.donnees_engins());
    })
  }
  ngOnInit() {
    this.gasoilstore.loadconso();
    this.enginsstore.loadengins();
    this.approgasoil.loadappro();
    this.taches_store.loadTaches();
    this.unites_store.loadUnites();
  }
  service = inject(WenService)
  gasoilstore=inject(GasoilStore)
  enginsstore=inject(EnginsStore)
  approgasoil=inject(ApproGasoilStore)
  taches_store=inject(TachesStore)
  unites_store=inject(UnitesStore)
  valider() {
    // let enginId=this.enginsstore.donnees_engins().map(x=>x.id);
    //this.service. uploadGasoilNumero(enginId).subscribe()
  
  }

  
}
