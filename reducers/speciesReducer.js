import actionTypes from "../actions/speciesActions";
import peopleActionTypes from "../actions/peopleActions";

export const initialState = {
  species: {},
  error: null
};

const speciesReducer = (state = initialState, action) => {
  switch (action.type) {
    case peopleActionTypes.LOAD_PEOPLE_SUCCESS:
      let test = action.payload.results.reduce((acc, cur) => {
        acc[cur.species[0]] = state.species[cur.species[0]]
          ? state.species[cur.species[0]]
          : {
              state: false,
              id: cur.species[0]
            };
        return acc;
      }, {});
      return {
        ...state,
        species: {
          ...state.species,
          ...test
        }
      };
    case actionTypes.LOADING_SPECIES:
      return {
        ...state,
        species: {
          ...state.species,
          [action.payload.id]: {
            ...state.species[action.payload.id],
            state: true
          }
        }
      };
    case actionTypes.LOAD_SPECIES_SUCCESS:
      if (!action.payload.id) {
        return state;
      }
      return {
        ...state,
        species: {
          ...state.species,
          [action.payload.id]: action.payload.data
        }
      };
    default:
      return state;
  }
};

export default speciesReducer;
