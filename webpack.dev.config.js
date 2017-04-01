const baseConfig        = require('./webpack.base.conf');
const merge             = require('webpack-merge');
const webpack           = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(baseConfig, {

  devtool: '#cheap-module-source-map',

  devServer: {
  //   historyApiFallback: true,
  //   noInfo: true
    overlay: {
      warnings: true,
      errors: true
    }
  },

  output: {
    chunkFilename: 'js/[name].js'
  },

  plugins: [
    new webpack.NamedModulesPlugin(),

    new HtmlWebpackPlugin({
      template : './index.html',
      cache    : true
    })
  ]

});
