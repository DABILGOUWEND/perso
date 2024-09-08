import { Component, effect, inject, OnInit } from '@angular/core';
import { WenService } from '../../wen.service';
import { ApproGasoilStore, EnginsStore, GasoilStore, TachesEnginsStore, TachesStore, UnitesStore } from '../../store/appstore';

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
    console.log(this.taches_engins.taches_data().map(
      x=>{return {'designation':x.taches,'id':x.id}}
    )
  );
    })
  }
  ngOnInit() {
    this.gasoilstore.loadconso();
    this.enginsstore.loadengins();
    this.approgasoil.loadappro();
    this.taches_store.loadTaches();
    this.unites_store.loadUnites();
    this.taches_engins.loadTachesEngins();
  }
  service = inject(WenService)
  gasoilstore=inject(GasoilStore)
  enginsstore=inject(EnginsStore)
  approgasoil=inject(ApproGasoilStore)
  taches_store=inject(TachesStore)
  unites_store=inject(UnitesStore)
  taches_engins=inject(TachesEnginsStore)
  valider() {
    // let enginId=this.enginsstore.donnees_engins().map(x=>x.id);
    //this.service. uploadGasoilNumero(enginId).subscribe()
  
  }

  
}
