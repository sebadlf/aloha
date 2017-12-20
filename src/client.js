import React from 'react';
import { hydrate } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { renderRoutes } from 'react-router-config';

import createHistory from 'history/createBrowserHistory';
import { ConnectedRouter, routerMiddleware } from 'react-router-redux';


import routes from './routes';

import rootReducer from './reducers';

// require('./service/interceptor')

import { setSize } from './actions/app';

// Create a history of your choosing (we're using a browser history in this case)
const history = createHistory();

const store = createStore(
  rootReducer,
  window.__INITIAL_STATE__,
  compose(
    applyMiddleware(ReduxThunk, promiseMiddleware(), routerMiddleware(history)),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

window.addEventListener('load', () => store.dispatch(setSize()));
window.addEventListener('resize', () => store.dispatch(setSize()));

// if (module.hot) {
//   // Enable Webpack hot module replacement for reducers
//   module.hot.accept('./reducers', () => {
//     const nextRootReducer = require('./reducers/index')
//     store.replaceReducer(nextRootReducer)
//   })
// }

hydrate(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      {renderRoutes(routes)}
    </ConnectedRouter>
  </Provider>
  , document.getElementById('root'),
);

if (module.hot) {
  module.hot.accept();
}
