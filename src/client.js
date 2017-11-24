import React from 'react';
import { render } from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import BrowserRouter from 'react-router-dom/BrowserRouter';
import { renderRoutes } from 'react-router-config';

import routes from './routes';

import rootReducer from './reducers';

// import {setSize} from './actions/admin'
// require('./service/interceptor')

const store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(ReduxThunk, promiseMiddleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f,
  ),
);

// window.addEventListener('load', () => store.dispatch(setSize()))
// window.addEventListener('resize', () => store.dispatch(setSize()))

// if (module.hot) {
//   // Enable Webpack hot module replacement for reducers
//   module.hot.accept('./reducers', () => {
//     const nextRootReducer = require('./reducers/index')
//     store.replaceReducer(nextRootReducer)
//   })
// }

render(
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
