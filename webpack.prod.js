const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    ...common.plugins,
    new webpack.EnvironmentPlugin({
      // TODO update with production api url
      API_URL: 'http://localhost:3000',
    }),
  ],
});
