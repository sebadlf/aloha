import * as actionTypes from './actionTypes';
import * as locationService from '../services/location';

export const getLocation = slug => dispatch => dispatch({
  type: actionTypes.LOCATION_GET_LOCATION,
  payload: locationService.getLocation(slug),
});
