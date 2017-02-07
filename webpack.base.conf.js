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
    rules: [
      {
        test: /\.html$/,
        use: [`ngtemplate-loader?relativeTo=${ROOT_PATH}/src`, 'html-loader'],
        exclude: `${ROOT_PATH}/src/index.html`
      },

      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      },

      {
        test: /\.(png|jpg|gif|svg)$/,
        use: ['url-loader?limit=8192&name=[path][name].[ext]?[hash]']
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => isExternal(module)
    })
  ]
};
