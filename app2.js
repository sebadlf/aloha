const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();

const isProduction = process.env.NODE_ENV === 'production';

if (!isProduction) {
  // We require the bundler inside the if block because
  // it is only needed in a development environment. Later
  // you will see why this is a good idea
  const bundler = require('./bundler.js');
  bundler();

  const httpProxy = require('http-proxy');
  const proxy = httpProxy.createProxyServer();

  // Any requests to localhost:3000/build is proxied
  // to webpack-dev-server
  app.all('/build/*', (req, res) => {
    proxy.web(req, res, {
      target: 'http://localhost:4000',
    });
  });

  proxy.on('error', (e) => {
    console.log('Could not connect to proxy, please try again...', e);
  });
}

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

import React from 'react';
import { renderToString } from 'react-dom/server';

import StaticRouter from 'react-router-dom/StaticRouter';
import { renderRoutes } from 'react-router-config';

import routes from './src/routes';

// const router = express.Router();

app.use('*', (req, res) => {
  console.log('entro');

  const context = {};
  const content = renderToString(<StaticRouter location={req.url} context={context}>
    {renderRoutes(routes)}
  </StaticRouter>);

  console.log(content);

  // res.send(content);
  res.render('index', { title: 'Express', data: false, content });
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
