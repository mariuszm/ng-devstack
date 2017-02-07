const baseConfig        = require('./webpack.base.conf');
const path              = require('path');
const webpack           = require('webpack');
const merge             = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = merge(baseConfig, {

  devtool: '#cheap-module-source-map',

  // devServer: {
  //   historyApiFallback: true,
  //   noInfo: true
  // },

  output: {
    chunkFilename: 'js/[name].js'
  },

  module: {
    rules: [
      { test: /\.css$/,         use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap'] },
      { test: /\.(sass|scss)$/, use: ['style-loader', 'css-loader?sourceMap', 'postcss-loader?sourceMap', 'sass-loader?sourceMap'] }
    ]
  },

  plugins: [
    new webpack.NamedModulesPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      cache: true
    })
  ]

});
