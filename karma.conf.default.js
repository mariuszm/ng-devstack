/* jshint strict: false */

var cfg = require('./config.json');

module.exports = function (config) {
    var options = {
        frameworks: [ 'jasmine' ],
        plugins:    [ 'karma-jasmine', 'karma-phantomjs-launcher', 'karma-coverage' ],
        browsers:   [ 'PhantomJS' ],
        coverageReporter: { type: 'text' },
        preprocessors:    {}
    };

    options.preprocessors[ cfg.app + '/+(app|common)/**/!(*.spec).js' ] = 'coverage';
    options.files = [
        // bower:js
        // endbower
        'node_modules/ng-describe/dist/ng-describe.js',
        cfg.app + '/+(app|common)/**/*.module.js',
        cfg.app + '/+(app|common)/**/!(*.spec).js',
        cfg.build + '/assets/' + cfg.templateFile,
        cfg.paths.tests
    ];

    config.set(options);
};
