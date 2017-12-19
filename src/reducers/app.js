import * as actionTypes from '../actions/actionTypes';

const initialState = {
  size: {
    width: 1600,
    height: 1200,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.APP_SET_SIZE:
      return {
        ...state,
        size: action.payload,
      };
    default:
      return state;
  }
};
