/* jshint strict: false */

var cfg = require('./config.json');

module.exports = function (config) {
    config.set({
        exclude: [
            'vendor/*jquery*/src/**/*.js'
        ],
        files: [
            { pattern: 'vendor/jquery/dist/jquery.js', watched: false },
            { pattern: 'vendor/angular/angular.js', watched: false },
            { pattern: 'vendor/**/*.js', watched: false },
            cfg.build + '/+(app|common)/**/*.module.js',
            cfg.build + '/+(app|common)/**/*.config.js',
            cfg.build + '/+(app|common)/**/*.controller.js',
            cfg.build + '/app/templates.js',
            cfg.build + '/app/conf.js',
            cfg.paths.tests
        ],

        frameworks: ['jasmine'],
        plugins: ['karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage'],

        reporters: ['progress', 'coverage'],

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
