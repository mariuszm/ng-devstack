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
    },
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      }
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
