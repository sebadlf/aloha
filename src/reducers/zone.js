import * as actionTypes from '../actions/actionTypes';

const initialState = {
  city: {},
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ZONE_GET_ZONE_PENDING:
      return {
        ...state,
        city: {},
        loading: true,
      };
    case actionTypes.ZONE_GET_ZONE_FULFILLED:
      return {
        ...state,
        city: action.payload,
        loading: false,
      };
    case actionTypes.ZONE_GET_ZONE_REJECTED:
      return {
        ...state,
        city: {},
        loading: false,
      };
    default:
      return state;
  }
};
