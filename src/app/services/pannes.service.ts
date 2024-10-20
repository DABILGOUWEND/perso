import { computed, inject, Injectable } from '@angular/core';
import { PannesStore, EnginsStore } from '../store/appstore';
import { WenService } from '../wen.service';

@Injectable({
  providedIn: 'root'
})
export class PannesService {
  _pannestore = inject(PannesStore);
  _enginStore = inject(EnginsStore);
  _app_service = inject(WenService);
  heure_pannes = computed(() => {
    let donnees = this._enginStore.donnees_engins();
    let engins_id = this._pannestore.donnees_pannes().map(x => x.engin_id);
    let h_pannes: any = [];
    donnees.forEach(element => {
      if (engins_id.includes(element.id)) {
        let filtre1 = this._pannestore.donnees_pannes().filter(x => x.engin_id === element.id);
        let rep1 = filtre1.find(x => x.situation === 'garage');
        if (rep1) {
          h_pannes.push(this._app_service.calculateDiff1(this._app_service.convertDate(rep1.debut_panne), rep1.heure_debut));
        }
        else {
          h_pannes.push("");
        }
      }
      else {
        h_pannes.push(0);
      }
    });
    return h_pannes
  })
}
