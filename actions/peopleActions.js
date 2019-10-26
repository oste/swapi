const actionTypes = {
  LOAD_PEOPLE: "LOAD_PEOPLE",
  LOAD_PEOPLE_SUCCESS: "LOAD_PEOPLE_SUCCESS",
  LOAD_PEOPLE_ERROR: "LOAD_PEOPLE_ERROR",
  CHANGE_SEARCH: "CHANGE_SEARCH",
  SORT: "SORT"
};

export default actionTypes;

export const loadPeople = () => ({
  type: actionTypes.LOAD_PEOPLE
});

export const loadPeopleSuccess = data => ({
  type: actionTypes.LOAD_PEOPLE_SUCCESS,
  payload: data
});

export const loadPeopleError = error => ({
  type: actionTypes.LOAD_PEOPLE_ERROR,
  payload: error
});

export const sort = (sortBy, sortOrder, sortType) => ({
  type: actionTypes.SORT,
  payload: {
    sortBy,
    sortOrder,
    sortType
  }
});

export const searchChange = value => ({
  type: actionTypes.CHANGE_SEARCH,
  payload: value
});
