const merge = require('webpack-merge');
const webpack = require('webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devServer: {
    historyApiFallback: true,
  },
  plugins: [
    ...common.plugins,
    new webpack.EnvironmentPlugin({
      API_URL: 'http://localhost:3000',
    }),
  ],
});
