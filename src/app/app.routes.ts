import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EnginsComponent } from './components/engins/engins.component';
import { GasoilComponent } from './components/gasoil/gasoil.component';
import { LoginComponent } from './components/login/login.component';
import { PannesComponent } from './components/pannes/pannes.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { PointageComponent } from './components/pointage/pointage.component';
import { RapportPanneComponent } from './components/rapport-panne/rapport-panne.component';
import { TravauxComponent } from './components/travaux/travaux.component';
import { Essai2Component } from './components/essai2/essai2.component';
import { SousTraitanceComponent } from './components/sous-traitance/sous-traitance.component';
import { ConstatsComponent } from './components/constats/constats.component';
import { AttachementsComponent } from './components/attachements/attachements.component';
import { PrestationComponent } from './components/prestation/prestation.component';
import { DecomptesComponent } from './components/decomptes/decomptes.component';
import { PointageTrvxEnginsComponent } from './components/pointage-trvx-engins/pointage-trvx-engins.component';
import { TableauBordComponent } from './components/tableau-bord/tableau-bord.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { administraGuard } from './administra.guard';
import { travauxGuard } from './travaux.guard';
import { HomeComponent } from './components/home/home.component';
import { homeGuard } from './home.guard';

export const routes: Routes = [
    {
        path: "", redirectTo: "/home", pathMatch: "full"
    },
    {
        path: 'accueil', component: AccueilComponent,canActivate  : [homeGuard]
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'travaux', component: TravauxComponent,canActivate: [travauxGuard] 
    },

    {
        path: 'pannes', component: PannesComponent,canActivate: [administraGuard]   
    },
    {
        path: 'pointage', component: PointageComponent,canActivate: [administraGuard]   
    },
    {
        path: 'materiel', component: EnginsComponent,canActivate: [administraGuard]   
    },
    {
        path: 'personnel', component: PersonnelComponent,canActivate: [administraGuard]   
    }
    ,
    {
        path: 'gasoil', component: GasoilComponent,canActivate  : [administraGuard]
    }
    ,
    {
        path: 'rapportpannes', component: RapportPanneComponent,canActivate: [administraGuard]   
    }
    ,
    {
        path: 'essai', component: Essai2Component
    }
    ,
    {
        path: 'sstrce', component: SousTraitanceComponent,canActivate: [travauxGuard] 
    }
    ,
    {
        path: 'constats', component: ConstatsComponent,canActivate: [travauxGuard] 
    }
    ,
    {
        path: 'attachements', component: AttachementsComponent,canActivate: [travauxGuard] 
    }
    ,
    {
        path: 'prestation', component: PrestationComponent,canActivate: [travauxGuard] 
    }
    ,
    {
        path: 'decomptes', component: DecomptesComponent
    },
    {
        path: 'pointagestrvx', component: PointageTrvxEnginsComponent,canActivate: [travauxGuard] 
    }
    ,
    {
        path: 'taches_projets', component: TableauBordComponent,canActivate: [travauxGuard] 
    }
    ,
    {
        path: 'register', component: RegisterComponent
    }
    ,
    {
        path: 'home', component: HomeComponent,canActivate  : [homeGuard]
    }
];
