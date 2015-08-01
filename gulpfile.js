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
        .pipe(plugins.sass())
        .pipe(plugins.sourcemaps.write())
        .on('error', function (err) {
            console.log(err.message);
            // process.exit(1);
        })
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
        if (err && err.code === 'ENOENT') {
            fs.writeFileSync('karma.conf.js', fs.readFileSync('karma.conf.default.js'));
        }
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
            module: 'templates.app',
            standalone: true
        }))
        .pipe(plugins.concat('templates.js'))
        .pipe(gulp.dest(config.build + '/app'))
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
        .pipe(gulp.dest(config.build))
        .pipe(bs.stream());
};
gulp.task('scripts:lint', function () {
    return fnLint(config.paths.scripts, true);
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
    var inject = {
        css : [config.build + '/assets/*.css'],
        js  : [config.build + '/+(app|common)/**/*.module.js', config.build + '/+(app|common)/**/*.js']
    };

    var sources = gulp.src(inject.css.concat(inject.js), { read: false });

    return gulp.src(path)
        .pipe(plugins.inject(sources, {
            addRootSlash: false,
            ignorePath: ['/', config.build + '/']
        }))
        .pipe(gulp.dest(config.build))
        .pipe(bs.stream());
};
gulp.task('html:inject', ['styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'wiredep'], function () {
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
    var assets = plugins.useref.assets();
    var cssFilter = plugins.filter('**/*.css', { restore: true });
    var jsFilter = plugins.filter('**/*.js', { restore: true });

    return gulp.src(config.build + '/index.html')
        .pipe(plugins.plumber())
        .pipe(assets)
        .pipe(cssFilter)
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(plugins.csso())
        .pipe(plugins.size({ showFiles: true, title: '[CSS]' }))
        .pipe(cssFilter.restore)
        .pipe(jsFilter)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(plugins.size({ showFiles: true, title: '[JS]' }))
        .pipe(jsFilter.restore)
        .pipe(assets.restore())
        .pipe(plugins.useref())
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

gulp.task('test:run', ['scripts:lint', 'scripts:cacheTpls', 'styles:sass', 'html:inject'] , function (done) {
    cfg.singleRun = true;
    var server = new Server(cfg, done);
    server.start();
});




// Set up Watch
// ============

gulp.task('watch', function () {
    var runSequence = require('run-sequence');

    runSequence('clean:build', ['styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'assets:img', 'html:inject'], function () {
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

        // watch for JS changes
        gulp.watch(config.paths.scripts, function (event) {
            switch (event.type) {
                case 'deleted':
                    del(event.path.replace(config.app, config.build));
                    return fnInject(config.build + '/index.html');
                case 'added':
                    runSequence('scripts:lint', function () {
                        return fnInject(config.build + '/index.html');
                    });
                    break;
                default:
                    return fnLint(event.path);
            }
        });

        // watch AngularJS templates to cache
        gulp.watch(config.app + '/+(app|common)/**/*.tpl.html', ['scripts:cacheTpls']);

        // watch for SASS changes
        gulp.watch(config.paths.sass, ['styles:sass']);

        // watch for assets changes
        gulp.watch(config.paths.assets, function (event) {
            if (event.type === 'deleted') {
                del(event.path.replace(config.app, config.build));
            } else {
                return fnImg(event.path);
            }
        });

        // watch for index.html changes
        gulp.watch(config.paths.html, function () {
            runSequence('wiredep', function () {
                return fnInject(config.build + '/index.html');
            });
        });
    });
});




// Clean up development & production directories
// =============================================

gulp.task('clean:build', function (cb) {
    del(config.build, cb);
});
gulp.task('clean:dist', function (cb) {
    del(config.dist, { force: true }, cb);
});




// Main gulp tasks
// ===============

gulp.task('build', ['clean:build'], function () {
    var buildTasks = ['styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'test:run', 'assets:img', 'html:inject'];
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
