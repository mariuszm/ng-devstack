/* jshint strict: false */

var cfg = require('./config.json');

module.exports = function (config) {
    config.set({
        files: [
            // bower:js
            // endbower
            'node_modules/ng-describe/dist/ng-describe.js',
            cfg.build + '/+(app|common)/**/*.module.js',
            cfg.build + '/+(app|common)/**/*.js',
            cfg.paths.tests
        ],
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage'],

        preprocessors: {
            'src/**/*.js': 'coverage'
        },

        coverageReporter: {
            type: 'text'
        },

        browsers: [
            'PhantomJS'
        ]
    });
};
