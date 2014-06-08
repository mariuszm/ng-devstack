/* jshint strict: false */

module.exports = function (config) {
    config.set({
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
