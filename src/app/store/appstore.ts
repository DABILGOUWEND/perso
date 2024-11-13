import { computed, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, concat, forkJoin, map, of, pipe, switchMap, tap } from "rxjs";

import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { eleve_state } from "../models/modeles";
import { get } from "http";
import { WenService } from "../wen.service";

const initial_eleve_state: eleve_state = {
    data_eleve: [],
    message: '',
    selectedEleve: ''
}


/*************************** */
export const eleves_store = signalStore(
    { providedIn: 'root' },
    withState(initial_eleve_state),
    withComputed((store)=>({
        taille: computed(()=>{
            return store.data_eleve.length
        }),
    })),
    withMethods((store, snackbar = inject(MatSnackBar), wen_service=inject(WenService)) =>
    (
        {
            loadEleves: rxMethod<void>(pipe(switchMap(() => {
                return wen_service.get_all_eleves().pipe(
                    tap((data) => {
                        patchState(store, { data_eleve: data })
                    })
                )
            }
            ))),
            

        }
    ))
)
