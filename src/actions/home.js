import * as actionTypes from './actionTypes';

import { getAll } from '../services/city';

export const getCities = value => dispatch => dispatch({
  type: actionTypes.HOME_GET_CITIES,
  payload: getAll(value),
});

export const searchInputChange = value => (dispatch) => {
  dispatch({
    type: actionTypes.HOME_SEARCH_INPUT_CHANGE,
    payload: value,
  });

  if (value && value.length && value.length >= 3) {
    dispatch(getCities(value));
  }
};

