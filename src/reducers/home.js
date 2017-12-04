import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Bienvenido!!!',
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
    default:
      return state;
  }
};
