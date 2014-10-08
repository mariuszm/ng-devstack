/* jshint strict: false */
/*
 More on LiveReload: http://rhumaric.com/2014/01/livereload-magic-gulp-style/
 */

module.exports = function (lr) {

    var express         = require('express'),
        app             = express(),
        http            = require('http'),
        serveIndex      = require('serve-index'),
        serveStatic     = require('serve-static'),
        EXPRESS_ROOT    = 'build',
        EXPRESS_PORT    = 4000,
        LIVERELOAD_PORT = 35729;

    // Uncomment following line if html5Mode is enabled.
    // app.use(require('connect-modrewrite')(['!\\.\\w+$ /index.html']));
    app.use(require('connect-livereload')({ port: LIVERELOAD_PORT }));
    app.use(serveStatic(EXPRESS_ROOT));
    app.use('/', serveIndex(EXPRESS_ROOT));

    var server = http.createServer(app);

    server.listen(EXPRESS_PORT);
    server.on('listening', function () {
        console.log('Running at\n  => http://localhost:' + EXPRESS_PORT + '/');
        require('open')('http://localhost:' + EXPRESS_PORT);
    });

    lr.listen(LIVERELOAD_PORT);
};
