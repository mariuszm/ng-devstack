const webpack            = require('webpack');
const baseConfig         = require('./webpack.base.conf');
const merge              = require('webpack-merge');
const validate           = require('webpack-validator');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = validate(merge(baseConfig, {

  devtool: '#eval',

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js'
  },

  module: {
    loaders: [
      { test: /\.css$/,         loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader']) },
      { test: /\.(sass|scss)$/, loader: ExtractTextPlugin.extract(['css-loader', 'postcss-loader', 'sass-loader']) }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin('styles/[name].[hash].css'),
    new (webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)(),

    new HtmlWebpackPlugin({
      template: './index.html',
      cache: true,
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true
      }
    })
  ]

}));
