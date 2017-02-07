const path              = require('path');
const webpack           = require('webpack');
const ROOT_PATH         = path.resolve(__dirname, './');
const isExternal = (module) => {
  let userRequest = module.userRequest;

  if (typeof userRequest !== 'string') {
    return false;
  }

  return userRequest.indexOf('node_modules') >= 0;
};


module.exports = {

  entry: {
    app: './index.js'
  },

  output: {
    path: `${ROOT_PATH}/dist`,
    publicPath: '',
    filename: 'js/[name].js'
  },

  context: `${ROOT_PATH}/src`,

  stats: {
    children: false
  },

  module: {
    loaders: [
      {
        test: /\.html$/,
        loaders: [`ngtemplate-loader?relativeTo=${ROOT_PATH}/src`, 'html-loader'],
        exclude: `${ROOT_PATH}/src/index.html`
      },

      {
        test: /\.js$/,
        loaders: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        loaders: ['url-loader?limit=8192&name=[path][name].[ext]?[hash]']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function (module) {
        return isExternal(module);
      }
    }),

    }),

    new (webpack.optimize.OccurenceOrderPlugin || webpack.optimize.OccurrenceOrderPlugin)()
  ]
};
