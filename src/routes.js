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
        path: '/zone/:id',
        component: Zone,
      },
      {
        path: '/location/:id',
        component: Location,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
