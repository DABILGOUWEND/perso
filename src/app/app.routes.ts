import { Routes } from '@angular/router';
import { EleveInscriptComponent } from './components/eleve-inscript/eleve-inscript.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path    : 'home',
        component: EleveInscriptComponent
    }
];
