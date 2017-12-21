import * as actionTypes from '../actions/actionTypes';

const initialState = {
  location: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOCATION_GET_LOCATION_PENDING:
      return {
        ...state,
        location: {},
        loading: true,
      };
    case actionTypes.LOCATION_GET_LOCATION_FULFILLED:
      return {
        ...state,
        location: action.payload,
        loading: false,
      };
    case actionTypes.LOCATION_GET_LOCATION_REJECTED:
      return {
        ...state,
        location: {},
        loading: false,
      };
    default:
      return state;
  }
};
