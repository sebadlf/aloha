import React from 'react';

import App from './containers/layout/app';
import Home from './containers/home';
import Zone from './containers/zone/zone';
import Location from './containers/location/location';
import NotFound from './containers/notFound';

const routes = [
  {
    component: App,
    routes: [
      {
        path: '/',
        exact: true,
        component: Home,
      },
      {
        path: '/home',
        component: Home,
      },
      {
        path: '/zone/:slug',
        component: Zone,
      },
      {
        path: '/location/:slug',
        component: Location,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
