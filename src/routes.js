import React from 'react';
import { renderRoutes } from 'react-router-config';

import Home from './containers/home';
import NotFound from './containers/notFound';

const App = ({ route }) => (
  <div>
    <span>Alojarte Aqui!!</span>
    {renderRoutes(route.routes)}
  </div>
);

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
