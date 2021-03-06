const webpack = require('webpack');
const path = require('path');
const CommonsChunkPlugin = require('webpack/lib/optimize/CommonsChunkPlugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const isProduction = process.env.NODE_ENV === 'production';

process.traceDeprecation = true;

const prodPlugins = [
  new webpack.LoaderOptionsPlugin({
    minimize: true,
    debug: false,
  }),
  new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: JSON.stringify('production'),
    },
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    mangle: true,
    compress: {
      warnings: false,
      pure_getters: true,
      unsafe: true,
      unsafe_comps: true,
      screw_ie8: true,
    },
    output: {
      comments: false,
    },
    exclude: [/\.min\.js$/gi], // skip pre-minified libs
  }),
  new CommonsChunkPlugin({
    filename: 'commons.js',
    name: 'commons',
  }),
  new ExtractTextPlugin('../stylesheets/[name].css'),
];

//  'transform-object-rest-spread',


const devPlugins = [
  // new webpack.HotModuleReplacementPlugin()
  new ExtractTextPlugin('../stylesheets/[name].css'),
];

const prodStylesScssConf = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: 'css-loader?url=false&sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap',
});

const devStylesScssConf = 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap!sass-loader?sourceMap';

const prodStylesCssConf = ExtractTextPlugin.extract({
  fallback: 'style-loader',
  use: 'css-loader?url=false&sourceMap!postcss-loader?sourceMap',
});

const devStylesCssConf = 'style-loader!css-loader?sourceMap!postcss-loader?sourceMap';

// const hotReloadEndpoints = ['webpack/hot/only-dev-server', 'webpack-dev-server/client?http://localhost:4000'];

const clientEntry = ['./src/client.js'];

module.exports = {
  devtool: isProduction ? 'source-map' : 'eval-source-map',
  entry: {
    client: clientEntry, // isProduction ? clientEntry : hotReloadEndpoints.concat(clientEntry),
  },
  output: {
    path: path.join(__dirname, 'public/build/javascripts'),
    publicPath: '/build/javascripts/',
    filename: '[name].js',
    chunkFilename: '[id].chunk.js',
  },
  module: {
    rules: [{
      test: /.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      options: {
        presets: ['env', 'react', 'stage-0'],
      },
    }, {
      test: /\.scss$/,
      loader: isProduction ? prodStylesScssConf : prodStylesScssConf, // devStylesScssConf,
    }, {
      test: /\.css$/,
      loader: isProduction ? prodStylesCssConf : prodStylesCssConf, // devStylesCssConf,
    }],
  },
  plugins: isProduction ? prodPlugins : devPlugins,
};
