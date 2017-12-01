import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import home from './home';
// import statistics from './statistics'
// import moderation from './moderation'

export default combineReducers({
  routing,
  home,
//   statistics,
//   moderation
});
