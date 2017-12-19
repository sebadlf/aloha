import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import app from './app';
import home from './home';
import zone from './zone';
// import statistics from './statistics'
// import moderation from './moderation'

export default combineReducers({
  routing,
  app,
  home,
  zone,
//   statistics,
//   moderation
});
