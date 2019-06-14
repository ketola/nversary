const path = require('path');
const slsw = require('serverless-webpack');

module.exports = {
  mode: 'none',
  entry: slsw.lib.entries,
  devtool: 'source-map',
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.json',
      '.ts',
      '.tsx'
    ]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js',
  },
  target: 'node',
  module: {
    rules: [
      { test: /\.ts$/, enforce: 'pre', loader: 'tslint-loader', options: { /* Loader options go here */ }},
      { test: /\.ts(x?)$/, loader: 'ts-loader' },
    ],
  },
};
