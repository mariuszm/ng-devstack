/* jshint strict: false */

var gulp    = require('gulp'),
    map     = require('map-stream'),
    del     = require('del'),
    plugins = require('gulp-load-plugins')(),
    server  = require('tiny-lr')(),
    config  = require('./config.json'),
    pkg     = require('./package.json');



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

// Compile SASS and add prefixes
var fnSass = function (path) {
    return gulp.src(path)
        .on('data', processWinPath)
        .pipe(plugins.plumber())
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.sass())
        .pipe(plugins.sourcemaps.write())
        .on('error', function (err) {
            console.log(err.message);
            // process.exit(1);
        })
        .pipe(plugins.size({ showFiles: true, title: '[CSS]' }))
        .pipe(gulp.dest(config.build + '/assets'))
        .on('end', function () {
            require('fs').unlink(path);
        });
};
gulp.task('styles:sass:imports', function () {
    var files = [config.app + '/+(sass|app|common)/**/*.scss', '!' + config.app + '/sass/includes/*.scss', '!' + config.app + '/+(app|common)/**/_*.scss'];
    return gulp.src(files, { read: false })
        .on('data', processWinPath)
        .pipe(plugins.intercept(function (file) {
            file.contents = new Buffer('@import \'' + file.path + '\';');
            return file;
        }))
        .pipe(plugins.concat(pkg.name + '-' + pkg.version + '.scss'))
        .pipe(gulp.dest(config.build + '/assets'));
});
gulp.task('styles:sass', ['styles:sass:imports'], function () {
    var files = config.build + '/assets/' + pkg.name + '-' + pkg.version + '.scss';
    return fnSass(files);
});

// Minify CSS
gulp.task('styles', ['styles:sass', 'vendor:css'], function () {
    var arr = (config.vendor_files.css).concat(config.build + '/assets/' + pkg.name + '-' + pkg.version + '.css');
    return gulp.src(arr)
        .pipe(plugins.concat(pkg.name + '-' + pkg.version + '.css'))
        .pipe(plugins.autoprefixer({
            browsers: ['last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4']
        }))
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.size({ showFiles: true, title: '[CSS]' }))
        .pipe(gulp.dest(config.dist + '/assets'));
});



// Prepare vendor files
// ====================

// Copy vendor JS files to /build/
gulp.task('vendor:js', function () {
    if (!config.vendor_files.js.length) {
        return;
    }
    return gulp.src(config.vendor_files.js, { base: '.' })
        .pipe(gulp.dest(config.build));
});

// Copy vendor css to /build/
gulp.task('vendor:css', function () {
    if (!config.vendor_files.css.length) {
        return;
    }
    return gulp.src(config.vendor_files.css, { base: '.' })
        .pipe(gulp.dest(config.build));
});

// Copy vendor assets to /build/
gulp.task('vendor:assets', function () {
    if (!config.vendor_files.assets.length) {
        return;
    }
    return gulp.src(config.vendor_files.assets, { base: '.' })
        .pipe(gulp.dest(config.build + '/assets'));
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
        .pipe(gulp.dest(config.build + '/app'));
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
        .pipe(gulp.dest(config.build));
};
gulp.task('scripts:lint', function () {
    return fnLint(config.paths.scripts, true);
});

// Perform final maintenance
gulp.task('scripts:tidy', ['scripts:lint', 'scripts:cacheTpls'], function () {
    var files = config.paths.scripts.concat(config.build + '/app/templates.js');
    return gulp.src(files)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.concatUtil(pkg.name + '-' + pkg.version + '.js', {
            process: function (src) {
                return (src.trim() + '\n').replace(/(^|\n)[ \t]*('use strict'|"use strict");?\s*/g, '$1');
            }
        }))
        .pipe(plugins.concatUtil.header('(function(window, document, undefined) {\n\'use strict\';\n'))
        .pipe(plugins.concatUtil.footer('\n})(window, document);\n'))
        .pipe(gulp.dest(config.dist + '/assets'));
});

// Concat and minify JavaScript
gulp.task('scripts', ['scripts:tidy', 'vendor:js'], function () {
    var arr = (config.vendor_files.js).concat(config.dist + '/assets/' + pkg.name + '-' + pkg.version + '.js');
    return gulp.src(arr)
        .pipe(plugins.concat(pkg.name + '-' + pkg.version + '.js'))
        .pipe(plugins.size({ showFiles: true, title: '[JS]' }))
        .pipe(plugins.uglify({
            mangle: false,
            compress: {
                drop_console: true
            }
        }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.size({ showFiles: true, title: '[JS]' }))
        .pipe(gulp.dest(config.dist + '/assets'))
        .on('end', function () {
            del(config.dist + '/assets/' + pkg.name + '-' + pkg.version + '.js', { force: true });
        });
});



// Prepare assets
// ==============

// Copy assets
var fnImg = function (path) {
    return gulp.src(path, { base: config.app })
        .pipe(gulp.dest(config.build));
};
gulp.task('assets:img', function () {
    return fnImg(config.paths.assets);
});

// Compress images
gulp.task('assets', ['assets:img', 'vendor:assets'], function () {
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
        css : (config.vendor_files.css).concat(config.build + '/assets/*.css'),
        js  : (config.vendor_files.js).concat(config.build + '/+(app|common)/**/*.module.js').concat(config.build + '/+(app|common)/**/*.js')
    };

    var sources = gulp.src(inject.css.concat(inject.js), { read: false });

    return gulp.src(path)
        .pipe(plugins.inject(sources, {
            addRootSlash: false,
            ignorePath: ['/', config.build + '/']
        }))
        .pipe(gulp.dest(config.build));
};
gulp.task('html:inject', ['styles:sass', 'scripts:lint', 'scripts:cacheTpls'], function () {
    return fnInject(config.paths.html);
});

// Replace non-optimized HTML blocks
gulp.task('html:replace', ['html:inject'], function () {
    return gulp.src(config.build + '/index.html')
        .pipe(plugins.htmlReplace({
            css: 'assets/' + pkg.name + '-' + pkg.version + '.min.css',
            js: 'assets/' + pkg.name + '-' + pkg.version + '.min.js'
        }))
        .pipe(gulp.dest(config.dist));
});

// Compile and minify HTML
gulp.task('html', ['html:replace'], function () {
    return gulp.src(config.dist + '/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(config.dist));
});



// Karma
// ============
var testFiles = [
    config.build + '/vendor/**/*.js',
    config.build + '/+(app|common)/**/*.module.js',
    config.build + '/+(app|common)/**/*.js',
    config.mocks,
    config.paths.tests
];

gulp.task('test:run', ['scripts:lint', 'scripts:cacheTpls', 'vendor:assets', 'styles:sass', 'html:inject'] , function () {
    // Be sure to return the stream
    return gulp.src(testFiles)
        .pipe(plugins.karma({
            configFile: 'karma.conf.js',
            action: 'run'
        }))
        .on('error', function (err) {
            process.exit(1);
        });
});

gulp.task('test:watch', ['scripts:lint', 'scripts:cacheTpls', 'vendor:assets', 'styles:sass', 'html:inject'], function () {
    gulp.src(testFiles)
        .pipe(plugins.karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});



// Set up Watch
// ============

// Add files to Watch
gulp.task('watch', ['styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'assets:img', 'vendor:css', 'vendor:js', 'vendor:assets', 'test:watch', 'html:inject'], function () {
    require('./server.js')(server);

    // watch for JS changes
    gulp.watch(config.paths.scripts, function (event) {
        if (event.path.lastIndexOf('.js') === event.path.length - 3) {
            if (event.type === 'deleted') {
                del(event.path.replace(config.app, config.build));
            } else {
                return fnLint(event.path).pipe(plugins.livereload(server));
            }
        }
    });

    // remove deleted JS files from index.html
    gulp.watch(config.build + '/+(app|common)/**/*.js', function (event) {
        if (event.type !== 'changed') {
            return fnInject(config.paths.html).pipe(plugins.livereload(server));
        }
    });

    // watch AngularJS templates to cache
    gulp.watch(config.app + '/+(app|common)/**', function (event) {
        if (event.path.lastIndexOf('.tpl.html') === event.path.length - 9) {
            return fnCacheTpls(config.paths.templates).pipe(plugins.livereload(server));
        }
    });

    // watch for SASS changes
    var runSequence = require('run-sequence');
    gulp.watch(config.paths.sass, function (event) {
        runSequence('styles:sass:imports', function () {
            var files = config.build + '/assets/' + pkg.name + '-' + pkg.version + '.scss';
            return fnSass(files).pipe(plugins.livereload(server));
        });
    });

    gulp.watch(config.paths.assets, function (event) {
        if (event.type === 'deleted') {
            del(event.path.replace(config.app, config.build));
        } else {
            return fnImg(event.path).pipe(plugins.livereload(server));
        }
    });

    gulp.watch(config.paths.html, function (event) {
        return fnInject(event.path).pipe(plugins.livereload(server));
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
    gulp.start('styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'vendor:css', 'vendor:js', 'vendor:assets', 'test:run', 'assets:img', 'html:inject');
});

gulp.task('compile', ['clean:dist', 'build'], function () {
    gulp.start('styles', 'scripts', 'assets', 'html');
});

gulp.task('default', function () {
    gulp.start('compile');
});
