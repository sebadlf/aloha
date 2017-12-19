import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchInputValue: '',
  searchValue
  cities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOME_SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchInputValue: action.payload,
      };
    case actionTypes.HOME_GET_CITIES_FULFILLED:
      return {
        ...state,
        cities: action.payload,
      };
    case actionTypes.HOME_GET_CITIES_REJECTED:
      return {
        ...state,
        cities: [],
      };
    default:
      return state;
  }
};
