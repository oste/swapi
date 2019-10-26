import { createStore, combineReducers, applyMiddleware } from "redux";

import peopleReducer, {
  initialState as peopleInitialState
} from "./reducers/peopleReducer";
import speciesReducer, {
  initialState as speciesInitialState
} from "./reducers/speciesReducer";

import { combineEpics, createEpicMiddleware } from "redux-observable";
import { peopleEpic } from "./epics/peopleEpic";
import { speciesEpic } from "./epics/speciesEpic";

export const initialState = {
  peopleReducer: peopleInitialState,
  speciesReducer: speciesInitialState
};

export function initializeStore(preloadedState = initialState) {
  const epicMiddleware = createEpicMiddleware();

  const store = createStore(
    combineReducers({
      peopleReducer,
      speciesReducer
    }),
    preloadedState,
    applyMiddleware(epicMiddleware)
  );

  epicMiddleware.run(combineEpics(peopleEpic, speciesEpic));

  return store;
}
