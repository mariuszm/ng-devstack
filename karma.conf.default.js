/* jshint strict: false */

var cfg = require('./config.json');

module.exports = function (config) {
    config.set({
        files: [
            // bower:js
            // endbower
            'node_modules/ng-describe/dist/ng-describe.js',
            cfg.app + '/+(app|common)/**/*.module.js',
            cfg.app + '/+(app|common)/**/!(*.spec).js',
            cfg.build + '/assets/' + cfg.templateFile,
            cfg.paths.tests
        ],
        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage'],

        preprocessors: {
            'src/+(app|common)/**/!(*.spec).js': 'coverage'
        },

        coverageReporter: {
            type: 'text'
        },

        browsers: [
            'PhantomJS'
        ]
    });
};
