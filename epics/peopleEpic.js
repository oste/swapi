// import Storage from "@aws-amplify/storage";

import { ofType, combineEpics } from "redux-observable";
import {
  map,
  catchError,
  mergeMap,
} from "rxjs/operators";
import { of } from "rxjs";

import { ajax } from "rxjs/ajax";

import actionTypes, {
  loadPeopleSuccess,
  loadPeopleError
} from "../actions/peopleActions";

if (!process.browser) {
  global.XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
}

const loadPeopleEpic = (action$, state$) =>
  action$.pipe(
    ofType(actionTypes.LOAD_PEOPLE),
    mergeMap(action => {
      return ajax
        .getJSON(
          `https://swapi.co/api/people/?search=${state$.value.peopleReducer.search}`
        )
        .pipe(
          map(data => {
            return loadPeopleSuccess(data);
          }),
          catchError(error => {
            return of(loadPeopleError(error));
          })
        );
    })
  );

export const peopleEpic = combineEpics(loadPeopleEpic);
