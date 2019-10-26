const actionTypes = {
  LOAD_SPECIES: "LOAD_SPECIES",
  LOADING_SPECIES: "LOADING_SPECIES",
  LOAD_SPECIES_SUCCESS: "LOAD_SPECIES_SUCCESS",
  LOAD_SPECIES_ERROR: "LOAD_SPECIES_ERROR"
};

export default actionTypes;

export const loadSpecies = species => ({
  type: actionTypes.LOAD_SPECIES,
  payload: species
});

export const loadingSpecies = species => ({
  type: actionTypes.LOADING_SPECIES,
  payload: species
});

export const loadSpeciesSuccess = (id, data) => ({
  type: actionTypes.LOAD_SPECIES_SUCCESS,
  payload: {
    id,
    data
  }
});

export const loadSpeciesError = error => ({
  type: actionTypes.LOAD_SPECIES_ERROR,
  payload: error
});
