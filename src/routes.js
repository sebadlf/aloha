import React from 'react';
import { renderRoutes } from 'react-router-config';

import Home from './containers/home';

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

const NoMatch = () => (
  <div>
    <span>NoMatch</span>
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
        component: NoMatch,
      },
    ],
  },
];

export default routes;
