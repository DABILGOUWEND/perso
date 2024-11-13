import { computed, inject } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable, concat, forkJoin, map, of, pipe, switchMap, tap } from "rxjs";

import { patchState, signalStore, withComputed, withMethods, withState } from "@ngrx/signals";
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { eleve_state } from "../models/modeles";
import { get } from "http";

const initial_eleve_state: eleve_state = {
    data_eleve: [],
    message: '',
    selectedEleve: ''
}


/*************************** */
export const eleveçstore = signalStore(
    { providedIn: 'root' },
    withState(initial_eleve_state),
    withComputed((store)=>({
        taille: computed(()=>{
            return store.data_eleve.length
        }),
    })),
    withMethods((store, snackbar = inject(MatSnackBar)) =>
    (
        {
            getEleves: rxMethod((store, id: string) => {
                return of(id).pipe(
                    switchMap((id) => {
                        return getDoc(doc(collectionData(collection(store.firestore, 'eleves')), id))
                    }),
                    map((doc) => {
                        return doc.data() as eleve_state
                    }),
                    tap((data) => {
                        store.dispatch(patchState(data))
                    })
                )
            }),
            

        }
    ))
)
