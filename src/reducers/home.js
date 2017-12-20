import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchInputValue: '',
  searchValue: null,
  cities: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOME_SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchInputValue: action.payload,
      };
    case actionTypes.HOME_VALUE_CHANGE:
      return {
        ...state,
        searchValue: action.payload,
      };
    case actionTypes.HOME_GET_CITIES_PENDING:
      return {
        ...state,
        cities: [],
        loading: true,
      };
    case actionTypes.HOME_GET_CITIES_FULFILLED:
      return {
        ...state,
        cities: action.payload,
        loading: false,
      };
    case actionTypes.HOME_GET_CITIES_REJECTED:
      return {
        ...state,
        cities: [],
        loading: false,
      };
    default:
      return state;
  }
};
