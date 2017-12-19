import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

import rootReducer from './reducers';

// require('./service/interceptor')

import { setSize } from './actions/app';


const store = createStore(
  rootReducer,
  window.__INITIAL_STATE__,
  // wiwindow.__INITIAL_STATE__,
  compose(
    applyMiddleware(ReduxThunk, promiseMiddleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

console.log('run');

window.addEventListener('load', () => store.dispatch(setSize()));
window.addEventListener('resize', () => store.dispatch(setSize()));

// window.addEventListener('load', () => store.dispatch(setSize()))
// window.addEventListener('resize', () => store.dispatch(setSize()))

// if (module.hot) {
//   // Enable Webpack hot module replacement for reducers
//   module.hot.accept('./reducers', () => {
//     const nextRootReducer = require('./reducers/index')
//     store.replaceReducer(nextRootReducer)
//   })
// }

hydrate(
  <Provider store={store}>
    <BrowserRouter>
      {renderRoutes(routes)}
    </BrowserRouter>
  </Provider>
  , document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
