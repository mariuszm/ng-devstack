const path              = require('path');
const webpack           = require('webpack');
const NODE_ENV          = process.argv.indexOf('-p') !== -1 ? 'production' : 'development';
const ROOT_PATH         = path.resolve(__dirname, './');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const sassImports = [
  `${ROOT_PATH}/src/sass/includes/_includes.scss`,
  `${ROOT_PATH}/src/sass/includes/variables.scss`
];

const isProduction = () => NODE_ENV === 'production';

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
    path       : `${ROOT_PATH}/dist`,
    publicPath : '',
    filename   : 'js/[name].js'
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
      },

      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader',     options: { sourceMap: !isProduction() } },
            { loader: 'postcss-loader', options: { sourceMap: !isProduction() } }
          ]
        })
      },
      {
        test: /\.(sass|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader',            options: { sourceMap: !isProduction() } },
            { loader: 'postcss-loader',        options: { sourceMap: !isProduction() } },
            { loader: 'sass-loader',           options: { sourceMap: !isProduction() } },
            { loader: 'sass-resources-loader', options: { resources: sassImports } }
          ]
        })
      }
    ]
  },

  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),

    new webpack.optimize.CommonsChunkPlugin({
      name      : 'vendor',
      minChunks : (module) => isExternal(module)
    }),

    new ExtractTextPlugin({
      filename  : 'styles/[name].[hash].css',
      allChunks : true,
      disable   : !isProduction()
    }),
  ]
};
