import * as actionTypes from './actionTypes';

import { getCity } from '../services/city';

export const getZone = slug => dispatch => dispatch({
  type: actionTypes.ZONE_GET_ZONE,
  payload: getCity(slug),
});
