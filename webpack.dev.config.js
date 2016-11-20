const baseConfig        = require('./webpack.base.conf');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const validate          = require('webpack-validator');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = validate(merge(baseConfig, {

  devtool: '#source-map',

  // devServer: {
  //   historyApiFallback: true,
  //   noInfo: true
  // },

  module: {
    loaders: [
      { test: /\.css$/,         loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap'] },
      { test: /\.(sass|scss)$/, loaders: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'] }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      cache: true
    })
  ]

}));
