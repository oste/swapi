// import Storage from "@aws-amplify/storage";

import { ofType, combineEpics } from "redux-observable";
import { map, catchError, mergeMap } from "rxjs/operators";
import { of, concat, defer } from "rxjs";

import { ajax } from "rxjs/ajax";

import actionTypes, {
  loadingSpecies,
  loadSpeciesSuccess,
  loadSpeciesError
} from "../actions/speciesActions";

if (!process.browser) {
  global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

const loadSpeciesEpic = (actions$, state$) =>
  actions$.pipe(
    ofType(actionTypes.LOAD_SPECIES),
    mergeMap(action => {
      return concat(
        of(loadingSpecies(action.payload)),
        defer(() => {
          if (state$.value.speciesReducer.species[action.payload.id].state) {
            return of(loadSpeciesSuccess());
          }

          return ajax.getJSON(action.payload.id).pipe(
            map(data => {
              return loadSpeciesSuccess(action.payload.id, data);
            }),
            catchError(error => {
              return of(loadSpeciesError(error));
            })
          );
        })
      );
    })
  );

export const speciesEpic = combineEpics(loadSpeciesEpic);
