import * as actionTypes from '../actions/actionTypes';

const initialState = {
  message: 'Bienvenido!!!',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_MENSAJE:
      return Object.assign(
        {},
        state, {
          size: action.payload,
        },
      );
    default:
      return state;
  }
};
