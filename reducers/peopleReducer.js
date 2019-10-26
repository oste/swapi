import actionTypes from "../actions/peopleActions";
import sortItems from "../lib/sortItems";

export const initialState = {
  search: "",
  loading: false,
  nextToken: 0,
  limit: 5,
  sort_by: "created_at",
  sort_order: 1,
  sort_type: null,
  people: [],
  error: null
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.CHANGE_SEARCH:
      return { ...state, search: action.payload };
    case actionTypes.SORT:
      sortItems(state.people, action.payload.sortBy, action.payload.sortOrder, action.payload.sortType);
      return {
        ...state,
        sort_by: action.payload.sortBy,
        sort_order: action.payload.sortOrder,
        sort_type: action.payload.sortType
      };
    case actionTypes.LOAD_PEOPLE:
      return {
        ...state,
        people: [],
        loading: true
      };
    case actionTypes.LOAD_PEOPLE_SUCCESS:
      return {
        ...state,
        people: action.payload.results,
        loading: false,
        nextToken: state.nextToken + state.limit
      };
    case actionTypes.LOAD_PEOPLE_ERROR:
      return {
        ...state,
        loading: false,
        error: action.payload
      };
    default:
      return state;
  }
};

export default postReducer;
