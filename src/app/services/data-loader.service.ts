import { inject, Injectable } from '@angular/core';
import { EnginsStore, ClasseEnginsStore, PersonnelStore, ProjetStore, PannesStore, GasoilStore, ApproGasoilStore, StatutStore, TachesEnginsStore, EntrepriseStore, DevisStore, ConstatStore, LigneDevisStore, SstraitantStore, AttachementStore, DecompteStore, UserStore } from '../store/appstore';
import { AuthenService } from '../authen.service';

@Injectable({
  providedIn: 'root'
})
export class DataLoaderService {
  //gestions
  _engins_store = inject(EnginsStore);
  _classes_engins_store = inject(ClasseEnginsStore);
  _personnel_store = inject(PersonnelStore);
  _projets_store = inject(ProjetStore);
  _pannes_store = inject(PannesStore);
  _consogo_store = inject(GasoilStore);
  _approgo_store = inject(ApproGasoilStore);
  _statuts_personnel_store = inject(StatutStore);

  //travaux
  _taches_engins_store = inject(TachesEnginsStore);
  _entreprise_store = inject(EntrepriseStore);
  _devis_store = inject(DevisStore)
  _constats_store = inject(ConstatStore)
  _ligneDevis_store = inject(LigneDevisStore)
  _sousTraitance_store = inject(SstraitantStore)
  _attachements_store = inject(AttachementStore)
  _decomptes_store = inject(DecompteStore)
  _users_store = inject(UserStore);

  _auth_service = inject(AuthenService);

  loadDataInit() {
    this._projets_store.loadProjets();
    this._entreprise_store.loadEntreprises();
  }
  setPath() {

    this._personnel_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/personnel');
    this._engins_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/engins');
    this._classes_engins_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/classes_engins');
    this._consogo_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/conso_gasoil');
    this._pannes_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/pannes');
    this._approgo_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/appro_go');
    this._statuts_personnel_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/statuts_personnel');
    this._devis_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/devis');
    this._ligneDevis_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/lignes_devis');
    this._sousTraitance_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/sous_traitants');
    this._constats_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/constats');
    this._attachements_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/attachements');
    this._decomptes_store.setPathString('comptes/' + this._auth_service.current_projet_id() + '/decomptes');

  }
  Load_gestion_Data() {
    this._engins_store.loadengins();
    this._classes_engins_store.loadclasses();
    this._personnel_store.loadPersonnel();
    this._pannes_store.loadPannes();
    this._consogo_store.loadconso();
    this._approgo_store.loadappro();
    this._statuts_personnel_store.loadstatut();
  }
  Load_travaux_Data() {
    this._taches_engins_store.loadTachesEngins();
    this._users_store.loadUsers();
    this._devis_store.loadDevis();
    this._ligneDevis_store.loadLigneDevis();
    this._sousTraitance_store.loadSstraitants();
    this._constats_store.loadConstats();
    this._attachements_store.loadAttachements();
    this._decomptes_store.loadAllDecomptes();
  }

}
