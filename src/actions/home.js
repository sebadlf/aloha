import { push } from 'react-router-redux';

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

export const valueChange = value => (dispatch) => {
  const houseId = value ? value.value : null;

  dispatch({
    type: actionTypes.HOME_VALUE_CHANGE,
    payload: houseId,
  });

  if (houseId) {
    dispatch(push(`/zone/${houseId}`));
  }
};

