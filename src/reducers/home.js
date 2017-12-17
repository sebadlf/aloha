import * as actionTypes from '../actions/actionTypes';

const initialState = {
  searchInputValue: '',
  cities: [],
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.HOME_SEARCH_INPUT_CHANGE:
      return {
        ...state,
        searchInputValue: action.payload,
        cities: action.payload.length >= 3 ? state.cities : [],
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
