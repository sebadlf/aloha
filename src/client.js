import React from 'react'
import { render } from 'react-dom'
import Routes from './routes'

import rootReducer from './reducers'

//import {setSize} from './actions/admin'

import { createStore, compose, applyMiddleware } from 'redux'
import {Provider} from 'react-redux'
import ReduxThunk from 'redux-thunk'
import promiseMiddleware from 'redux-promise-middleware'

//require('./service/interceptor')

let store = createStore(
  rootReducer,
  {},
  compose(
    applyMiddleware(ReduxThunk, promiseMiddleware()),
    window.__REDUX_DEVTOOLS_EXTENSION__ ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  )
)

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
    <Routes />
  </Provider>
, document.getElementById('root'))

if (module.hot) {
  module.hot.accept()
}
