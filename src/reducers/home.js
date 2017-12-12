import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Bienvenido!!!',
  cities: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MESSAGE_FULFILLED:
      return Object.assign(
        {},
        state, {
          message: action.payload,
        },
      );
    case actionTypes.GETCITIES_FULFILLED:
      return {
        ...state,
        cities: action.payload,
      };
    case actionTypes.GETCITIES_REJECTED:
      return {
        ...state,
        cities: [],
      };
    default:
      return state;
  }
};
