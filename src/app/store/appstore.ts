import { computed, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, concat, forkJoin, map, of, pipe, switchMap, tap } from "rxjs";

import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { eleve_state } from "../models/modeles";

const initial_eleve_state: eleve_state = {
    data_eleve: [],
    message: ''
}


/*************************** */
export const eleveçstore = signalStore(
    { providedIn: 'root' },
    withState(initial_eleve_state),
    withMethods((store, snackbar = inject(MatSnackBar)) =>
    (
        {
            

        }
    ))
)
