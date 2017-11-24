import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import Home from './containers/home';

const App = ({children}) => (
    <div>
        <span>Alojarte Aqui!</span>
        {children}
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

// import {
//     App,
//     NotFound,
//     DevTools,
//     Home
//   } from 'containers';

export default () => {
  /**
   * Please keep routes in alphabetical order
   */
  return (
    <Router>
    <App>
      { /* Home (main) route */ }
      <Switch>

        { /* Routes requiring login */ }
        { /* <Route onEnter={requireLogin}>
            <Route path="chat" component={Chat}/>
            <Route path="loginSuccess" component={LoginSuccess}/>
        </Route> */ }

        { /* Routes */ }

        <Route exact path='/' component={Home} />
        <Route path="devtools" component={DevTools} />

        { /* Catch all route */ }
        <Route component={NoMatch} />
      </Switch>
    </App>
    </Router>
  );
};
