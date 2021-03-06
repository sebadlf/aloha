// Server Side
import express from 'express';
import path from 'path';
import favicon from 'serve-favicon';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';

// Client Side
import React from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { matchRoutes, renderRoutes } from 'react-router-config';
import ReduxThunk from 'redux-thunk';
import promiseMiddleware from 'redux-promise-middleware';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

import rootReducer from './reducers';

import routes from './routes';

// Relative imports

import api from './api';

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

// if (!isProduction) {
//   // We require the bundler inside the if block because
//   // it is only needed in a development environment. Later
//   // you will see why this is a good idea
//   const bundler = require('../bundler.js');
//   bundler();

//   const httpProxy = require('http-proxy');
//   const proxy = httpProxy.createProxyServer();

//   // Any requests to localhost:3000/build is proxied
//   // to webpack-dev-server
//   app.all('/build/*', (req, res) => {
//     proxy.web(req, res, {
//       target: 'http://localhost:4000',
//     });
//   });

//   proxy.on('error', (e) => {
//     console.log('Could not connect to proxy, please try again...', e);
//   });
// }

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '..', 'public')));

app.use('/api', api);

const store = createStore(rootReducer, applyMiddleware(ReduxThunk, promiseMiddleware()));

app.get('/', (req, res) => {
  res.render('coming');
});

app.get('*', (req, res) => {
  const branch = matchRoutes(routes, req.url);

  const promises = branch.map(({ route, match }) => {
    const { fetchData } = route.component;
    return fetchData instanceof Function ? fetchData(store, match.params) : Promise.resolve({ notApply: 1 });
  });

  return Promise.all(promises).then((data) => {
    const context = {};
    const content = renderToString(<Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        {renderRoutes(routes)}
      </StaticRouter>
    </Provider>);

    if (context.status === 404) {
      res.status(404);
    }
    if (context.status === 302) {
      return res.redirect(302, context.url);
    }

    res.render('index', {
      title: 'Express',
      data: JSON.stringify(store.getState()),
      content,
      isProduction,
    });
  });
});

// app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
