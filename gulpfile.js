/* jshint strict: false */

var gulp     = require('gulp'),
    map      = require('map-stream'),
    del      = require('del'),
    minimist = require('minimist'),
    wiredep  = require('wiredep'),
    plugins  = require('gulp-load-plugins')(),
    bs       = require('browser-sync').create(),
    config   = require('./config.json'),
    pkg      = require('./package.json');




// Handle gulp parameters
// ======================

var knownOptions = {
    boolean: ['nobrowser', 'notest', 'nocoverage']
};
var args = minimist(process.argv.slice(2), knownOptions);




// Prepare CSS
// ===========

var processWinPath = function (file) {
    // Fix for bug with paths on Windows
    var path = require('path');
    if (process.platform === 'win32') {
        file.path = path.relative('.', file.path);
        file.path = file.path.replace(/\\/g, '/');
    }
};

// Compile SASS
gulp.task('styles:sass', function () {
    var files = [config.app + '/+(sass|app|common)/**/*.scss', '!' + config.app + '/sass/includes/*.scss', '!' + config.app + '/+(app|common)/**/_*.scss'];
    return gulp.src(files, { read: false })
        .on('data', processWinPath)
        .pipe(plugins.plumber())
        .pipe(plugins.order([
            config.app + '/sass/*.scss',
            config.app + '/+(app|common)/*/*.scss'
        ], { base: '.' }))
        .pipe(plugins.intercept(function (file) {
            file.contents = new Buffer('@import \'' + file.path + '\';');
            return file;
        }))
        .pipe(plugins.concat('app.scss'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass().on('error', plugins.sass.logError))
        .pipe(plugins.sourcemaps.write())
        .pipe(plugins.size({ showFiles: true, title: '[CSS]' }))
        .pipe(gulp.dest(config.build + '/assets'))
        .pipe(bs.stream());
});




// Wire Bower dependencies to source code
// ======================================

gulp.task('wiredep', function () {
    var options = {
        bowerJson: require(config.bower.json),
        directory: config.bower.directory,
        exclude: config.bower.exclude
    };

    // inject Bower dependencies to Karma config

    var extend = require('util')._extend;
    var testOptions = extend(options, {
        src: './karma.conf.js',
        fileTypes: {
            js: {
                block: /(([ \t]*)\/\/\s*bower:*(\S*))(\n|\r|.)*?(\/\/\s*endbower)/gi,
                detect: {
                    js: /['\']([^'\']+\.js)['\'],?/gi,
                    css: /['\']([^'\']+\.js)['\'],?/gi
                },
                replace: {
                    js: '{ pattern: "{{filePath}}", watched: false },',
                    css: '"{{filePath}}",'
                }
            }
        },
    });

    var fs = require('fs');
    fs.stat('karma.conf.js', function (err, stat) {
        fs.writeFileSync('karma.conf.js', fs.readFileSync('karma.conf.default.js'));
        wiredep(testOptions);
    });

    return gulp.src(config.paths.html)
        .pipe(wiredep.stream(options))
        .pipe(gulp.dest(config.build));
});




// Prepare JavaScript
// ==================

// Cache AngularJS templates
var fnCacheTpls = function (path) {
    return gulp.src(path)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.angularTemplatecache({
            module: 'app.templates',
            standalone: true
        }))
        .pipe(plugins.concat(config.templateFile))
        .pipe(gulp.dest(config.build + '/assets'))
        .pipe(bs.stream());
};
gulp.task('scripts:cacheTpls', function () {
    return fnCacheTpls(config.paths.templates);
});

// Check JavaScript code quality with JSHint
var fnLint = function (path, exitOnError) {
    return gulp.src(path, { base: config.app })
        .pipe(plugins.plumber())
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('jshint-stylish-ex'))
        .pipe(map(function (file, cb) {
            if (!file.jshint.success && exitOnError) {
                process.exit(1);
            }
            cb(null, file);
        }))
        .pipe(bs.stream());
};
gulp.task('scripts:lint', function () {
    if (watcher.isWatching) {
        return fnLint(watcher.path);
    } else {
        return fnLint(config.paths.scripts, true);
    }
});

var fnScripts = function () {
    var files = [
        config.app + '/+(app|common)/**/*.module.js',
        config.app + '/+(app|common)/**/*.js',
        '!' + config.paths.tests
    ];

    return gulp.src(files, { base: config.app })
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concatUtil('app.js', {
            process: function (src) {
                return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            }
        }))
        .pipe(plugins.concatUtil.header('(function (window, document, undefined) {\n\'use strict\';\n'))
        .pipe(plugins.concatUtil.footer('\n}) (window, document);\n'))
        .pipe(plugins.sourcemaps.write({ sourceRoot: '/' + config.app }))
        .pipe(plugins.size({ showFiles: true, title: '»»»' }))
        .pipe(gulp.dest(config.build + '/assets'))
        .pipe(bs.stream());
};
gulp.task('scripts', ['scripts:cacheTpls', 'scripts:lint'], function () {
    return fnScripts();
});


// Prepare assets
// ==============

// Copy assets
var fnImg = function (path) {
    return gulp.src(path, { base: config.app })
        .pipe(gulp.dest(config.build))
        .pipe(bs.stream());
};
gulp.task('assets:img', function () {
    return fnImg(config.paths.assets);
});

// Compress images
gulp.task('assets', ['assets:img'], function () {
    return gulp.src([config.build + '/assets/**', '!' + config.build + '/assets/*.+(css|scss)'])
        .pipe(plugins.plumber())
        // .pipe(plugins.bytediff.start())
        .pipe(plugins.newer(config.dist + '/assets'))
        // .pipe(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
        // .pipe(plugins.bytediff.stop())
        .pipe(gulp.dest(config.dist + '/assets'));
});




// Prepare HTML
// ============

// Inject CSS & JS to index.html source
var fnInject = function (path) {
    var files = [config.build + '/assets/app.css', config.build + '/assets/*.js'];
    var sources = gulp.src(files, { read: false });

    return gulp.src(path)
        .pipe(plugins.inject(sources, {
            addRootSlash: false,
            ignorePath: ['/', config.build + '/']
        }))
        .pipe(gulp.dest(config.build))
        .pipe(bs.stream());
};
gulp.task('html:inject', ['styles:sass', 'scripts', 'wiredep'], function () {
    return fnInject(config.build + '/index.html');
});

// Compile and minify HTML
gulp.task('html', ['optimize'], function () {
    return gulp.src(config.dist + '/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(config.dist));
});




// Perform final optimization
// ==========================

var optimizeTasks = ['html:inject', 'test:run'];

if (args.notest) {
    optimizeTasks.splice(optimizeTasks.indexOf('test:run'), 1);
}

gulp.task('optimize', optimizeTasks, function () {
    var __filterCSS = plugins.filter('**/*.css', { restore: true });
    var __filterJS  = plugins.filter('**/*.js', { restore: true });

    return gulp.src(config.build + '/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.useref())
        .pipe(__filterCSS)
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(plugins.csso())
        .pipe(plugins.size({ showFiles: true, title: '»»»' }))
        .pipe(__filterCSS.restore)
        .pipe(__filterJS)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(plugins.size({ showFiles: true, title: '»»»' }))
        .pipe(__filterJS.restore)
        .pipe(plugins.size())
        .pipe(gulp.dest(config.dist));
});




// Karma
// =====

var Server = require('karma').Server;

var cfg = {
    configFile: __dirname + '/karma.conf.js',
    reporters: ['progress', 'coverage']
};

if (args.nocoverage) {
    cfg.reporters.splice(cfg.reporters.indexOf('coverage'), 1);
}

gulp.task('test:run', ['scripts', 'styles:sass', 'html:inject'] , function (done) {
    cfg.singleRun = true;

    function karmaCompleted (karmaResult) {
        if (karmaResult === 1) {
            done();
            process.exit(1);
        } else {
            done();
        }
    }

    var server = new Server(cfg, karmaCompleted);
    server.start();
});




// Set up Watch
// ============
var watcher = {
    isWatching : false,
    path       : null
};

gulp.task('watch', function () {
    var runSequence = require('run-sequence');

    runSequence('clean:build', ['styles:sass', 'scripts', 'assets:img', 'html:inject'], function () {
        bs.init({
            logPrefix: 'Browsersync',
            open: !args.nobrowser,
            reloadOnRestart: true,
            server: {
                baseDir: './build',
                routes: {
                    '/vendor': './vendor'
                },
            }
        }, function (done) {
            if (args.notest) {
                return;
            }

            var server = new Server(cfg, done);
            server.start();
        });

        watcher.isWatching = true;

        // watch for JS changes
        gulp.watch(config.paths.scripts, function (event) {
            watcher.path = event.path;
            if (event.type === 'deleted') {
                del(event.path.replace(config.app, config.build));
                return fnScripts();
            } else {
                runSequence('scripts:lint', function () {
                    return fnScripts();
                });
            }
        });

        // watch AngularJS templates to cache
        gulp.watch(config.app + '/+(app|common)/**/*.tpl.html', ['scripts:cacheTpls']);

        // watch for SASS changes
        gulp.watch(config.paths.sass, ['styles:sass']);

        // watch for assets changes
        gulp.watch(config.paths.assets, function (event) {
            watcher.path = event.path;
            if (event.type === 'deleted') {
                del(event.path.replace(config.app, config.build));
            } else {
                return fnImg(event.path);
            }
        });

        // watch for index.html changes
        gulp.watch(config.paths.html, function (event) {
            watcher.path = event.path;
            runSequence('wiredep', function () {
                return fnInject(config.build + '/index.html');
            });
        });
    });
});




// Clean up development & production directories
// =============================================

gulp.task('clean:build', function (cb) {
    del(config.build).then(function () {
        cb();
    });
});
gulp.task('clean:dist', function (cb) {
    del(config.dist, { force: true }).then(function () {
        cb();
    });
});




// Main gulp tasks
// ===============

gulp.task('build', ['clean:build'], function () {
    var buildTasks = ['styles:sass', 'scripts', 'assets:img', 'html:inject', 'test:run'];
    if (args.notest) {
        buildTasks.splice(buildTasks.indexOf('test:run'), 1);
    }
    gulp.start(buildTasks);
});

gulp.task('compile', ['clean:dist', 'build'], function () {
    gulp.start('optimize', 'assets', 'html');
});

gulp.task('default', function () {
    gulp.start('compile');
});
