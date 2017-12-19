import * as actionTypes from './actionTypes';

import { getAll } from '../services/city';

export const getCities = () => dispatch => dispatch({
  type: actionTypes.HOME_GET_CITIES,
  payload: getAll(),
});

export const searchInputChange = value => (dispatch) => {
  dispatch({
    type: actionTypes.HOME_SEARCH_INPUT_CHANGE,
    payload: value,
  });

  return dispatch(getCities());
};

export const valueChange = value => (dispatch) => {
  dispatch({
    type: actionTypes.HOME_VALUE_CHANGE,
    payload: value,
  });
};
