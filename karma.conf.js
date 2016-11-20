const path = require('path');
const webpackConfig = require('./webpack.dev.config');
const commonsChunkPluginIndex = webpackConfig.plugins.findIndex(plugin => plugin.chunkNames);

webpackConfig.devtool = 'inline-source-map';
webpackConfig.plugins.splice(commonsChunkPluginIndex, 1);

process.env.BABEL_ENV = 'test';

module.exports = function (config) {
  let options = {
      webpack           : webpackConfig,
      webpackMiddleware : { noInfo: 'errors-only' },
      files             : [{ pattern: 'spec.bundle.js', watched : false }],
      preprocessors     : { 'spec.bundle.js': ['webpack', 'sourcemap'] },
      frameworks        : ['jasmine'],
      browsers          : ['PhantomJS'],
      reporters         : ['progress', 'coverage'],
      coverageReporter  : { type: 'text' },

      basePath    : '',
      exclude     : [],
      port        : 9876,
      colors      : true,
      logLevel    : config.LOG_INFO,
      autoWatch   : false,
      singleRun   : true,
      concurrency : Infinity
  };

  config.set(options);
};
