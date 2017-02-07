const baseConfig         = require('./webpack.base.conf');
const path               = require('path');
const webpack            = require('webpack');
const merge              = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin  = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin  = require('html-webpack-plugin');

module.exports = merge(baseConfig, {

  devtool: '#source-map',

  output: {
    filename: 'js/[name].[hash].js',
    chunkFilename: 'js/[name].[hash].js'
  },

  module: {
    rules: [
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      { test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader']
        })
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
      filename: 'styles/[name].[hash].css',
      allChunks: true
    }),

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

});
