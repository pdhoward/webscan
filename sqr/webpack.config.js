const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path');
const webpack = require('webpack');

const generateConfig = (
  entry,
  outputName,
  includeFrom,
  resolveAlias,
  envNames
) => ({
  node: {
    __dirname: true
  },
  watchOptions: {
    ignored: '/node_modules/',
    poll: true
  },
  entry: [entry],
  output: {
    path: path.resolve(__dirname, './'),
    filename: outputName,
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, 'node_modules')],
    alias: Object.keys(resolveAlias).reduce(function(previous, key) {
      previous[key] = path.resolve(__dirname, resolveAlias[key]);
      return previous;
    }, {})
  },
  devtool: 'source-map',
  plugins: [
    new webpack.EnvironmentPlugin(envNames),
    new CopyWebpackPlugin([
      { from: 'node_modules/zbar.wasm/data/zbar.wasm', to: 'data/' }
    ], {}),
  ],
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: path.resolve(__dirname, includeFrom),
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env'],
            plugins: [
              require('babel-plugin-transform-runtime'),
            ]
          }
        }
      }
    ]
  },
  externals: {
    'fs': true,
    'path': true,
  }
});

module.exports = [
  generateConfig(
    './index.js',
    'build.js',
    './',
    {},
    []
  )
];
