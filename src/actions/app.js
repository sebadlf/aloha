import * as actionTypes from './actionTypes';

const getSize = () => {
  const w = window;
  const d = document;
  const e = d.documentElement;
  const g = d.getElementsByTagName('body')[0];
  const width = w.innerWidth || e.clientWidth || g.clientWidth;
  const height = w.innerHeight || e.clientHeight || g.clientHeight;

  return {
    width,
    height,
  };
};

export const setSize = () => dispatch => dispatch({
  type: actionTypes.APP_SET_SIZE,
  payload: getSize(),
});
