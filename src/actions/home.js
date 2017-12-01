import * as actionTypes from './actionTypes';

const messagePromise = () => new Promise((resolve, reject) => {
  setTimeout(() => resolve('Mensaje 1'), 100);
});

export const setMessage = message => dispatch => dispatch({
  type: actionTypes.SET_MESSAGE,
  payload: messagePromise(),
});
