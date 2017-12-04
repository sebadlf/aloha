import React from 'react';

import App from './containers/layout/app';
import Home from './containers/home';
import NotFound from './containers/notFound';

const DevTools = () => (
  <div>
    <span>DevTools</span>
  </div>
);

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
        path: '/devtools',
        component: DevTools,
      },
      {
        component: NotFound,
      },
    ],
  },
];

export default routes;
