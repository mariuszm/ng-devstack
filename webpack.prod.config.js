const baseConfig           = require('./webpack.base.conf');
const merge                = require('webpack-merge');
const CleanWebpackPlugin   = require('clean-webpack-plugin');
const HtmlWebpackPlugin    = require('html-webpack-plugin');
const PreloadWebpackPlugin = require('preload-webpack-plugin');

module.exports = merge(baseConfig, {

  devtool: '#source-map',

  output: {
    filename      : 'js/[name].[hash].js',
    chunkFilename : 'js/[name].[hash].js'
  },

  plugins: [
    new CleanWebpackPlugin(['dist']),

    new HtmlWebpackPlugin({
      template : './index.html',
      cache    : true,
      minify: {
        collapseWhitespace            : true,
        removeComments                : true,
        removeRedundantAttributes     : true,
        removeScriptTypeAttributes    : true,
        removeStyleLinkTypeAttributes : true
      }
    }),

    new PreloadWebpackPlugin({
      rel: 'preload',
      as: 'script',
      include: 'all'
    })
  ]

});
