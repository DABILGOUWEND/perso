import { Routes } from '@angular/router';
import { AccueilComponent } from './components/accueil/accueil.component';
import { EnginsComponent } from './components/engins/engins.component';
import { GasoilComponent } from './components/gasoil/gasoil.component';
import { LoginComponent } from './components/login/login.component';
import { PannesComponent } from './components/pannes/pannes.component';
import { PersonnelComponent } from './components/personnel/personnel.component';
import { RapportPanneComponent } from './components/rapport-panne/rapport-panne.component';
import { Essai2Component } from './components/essai2/essai2.component';
import { ConstatsComponent } from './components/constats/constats.component';
import { AttachementsComponent } from './components/attachements/attachements.component';
import { DecomptesComponent } from './components/decomptes/decomptes.component';
import { RegisterComponent } from './components/register/register.component';
import { authGuard } from './auth.guard';
import { administraGuard } from './administra.guard';
import { travauxGuard } from './travaux.guard';
import { homeGuard } from './home.guard';
import { MyessaisComponent } from './components/myessais/myessais.component';
import { AdminComponent } from './components/admin/admin.component';
import { adminGuard } from './admin.guard';
import { HomeComptaComponent } from './components/home-compta/home-compta.component';
import { HomeTravauxComponent } from './components/home-travaux/home-travaux.component';
import { HomeMagasinComponent } from './components/home-magasin/home-magasin.component';
import { HomeAdminComponent } from './components/home-admin/home-admin.component';
import { GestionComponent } from './components/gestion/gestion.component';
import { gestionGuard } from './gestion.guard';
import { PointageComponent } from './components/pointage/pointage.component';
import { SousTraitanceComponent } from './components/sous-traitance/sous-traitance.component';
import { TelechargerComponent } from './components/telecharger/telecharger.component';
import { TableauBordComponent } from './components/tableau-bord/tableau-bord.component';
import { HomeComponent } from './components/home/home.component';
import { ListeDevisComponent } from './components/liste-devis/liste-devis.component';
import { ListeSousTraitantsComponent } from './components/liste-sous-traitants/liste-sous-traitants.component';
import { ListeSstraitantsComponent } from './components/liste-sstraitants/liste-sstraitants.component';

export const routes: Routes = [
    {
        path: "", redirectTo: "/home", pathMatch: "full"
    },
    {
        path: 'home', component: HomeComponent, canActivate: [homeGuard]

    }
    ,
    {
        path: 'login', component: LoginComponent
    },
    {
        path: "home_compta",
        component: HomeComptaComponent,
    },
    {
        path: "home_travaux",
        component: HomeTravauxComponent, canActivate: [travauxGuard],
        children: [

            {
                path: "", redirectTo: "/home_travaux/devis", pathMatch: "full"
            },
            {
                path: "devis",
                component: ListeDevisComponent
            },
            {
                path: "constats",
                component: ConstatsComponent
            }
            ,
            {
                path: "attachements",
                component: AttachementsComponent
            },
            {
                path: "decomptes",
                component: DecomptesComponent
            }
            ,
            {
                path: "liste_sstraitants",
                component: ListeSstraitantsComponent
            }

        ]
    },
    {
        path: "home_gestion",
        component: GestionComponent, canActivate: [gestionGuard],
        children: [
            {
                path: "", redirectTo: "/home_gestion/gasoil", pathMatch: "full"
            },
            {
                path: "gasoil",
                component: GasoilComponent
            },
            {
                path: "pannes",
                component: PannesComponent
            }
            ,
            {
                path: "pointages",
                component: PointageComponent
            }
            ,
            {
                path: "materiel",
                component: EnginsComponent
            }
            ,
            {
                path: "personnel",
                component: PersonnelComponent
            }
        ]
    },
    {
        path: "admin",
        component: AdminComponent, canActivate: [adminGuard],
        children: [
            {
                path: "", redirectTo: "/admin/tableau_bord", pathMatch: "full"
            },
            {
                path: "register",
                component: RegisterComponent
            },
            {
                path: "tableau_bord",
                component: TableauBordComponent
            }
        ]
    },
    {
        path: "essai2",
        component: Essai2Component
    },
    {
        path: "telecharger",
        component: TelechargerComponent
    }
];
