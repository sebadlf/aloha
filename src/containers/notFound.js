import React from 'react';
import { Route } from 'react-router-dom';

const NotMatch = () => (
  <Route render={({ staticContext }) => {
      if (staticContext) {
        staticContext.status = 404; // eslint-disable-line no-param-reassign
      }
      return (
        <div>
          <h1>404 : Not Found</h1>
        </div>
      );
    }}
  />
);

export default NotMatch;
