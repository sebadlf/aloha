import React from 'react';
import PropTypes from 'prop-types';
import { renderRoutes } from 'react-router-config';

import Header from '../header';
import Footer from '../footer';

require('react-select/dist/react-select.css');

require('./app.scss');

const App = ({ route }) => (
  <React.Fragment>
    <Header />
    <div className="App" style={{ marginTop: '60px' }}>
      {renderRoutes(route.routes)}
    </div>
    <Footer />
  </React.Fragment>
);

App.propTypes = {
  route: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
};

export default App;

