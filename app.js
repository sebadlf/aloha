require('babel-register')({
  presets: ['env', 'react'],
  plugins: [
    [
      'babel-plugin-transform-require-ignore',
      {
        extensions: ['.css', '.scss'],
      },
    ],
  ],
});

require('./db');

module.exports = require('./src/server');

