/* jshint strict: false */

var gulp    = require('gulp'),
    map     = require('map-stream'),
    plugins = require('gulp-load-plugins')(),
    server  = require('tiny-lr')(),
    config  = require('./config.json');



// Prepare CSS
// ===========

// Compile SASS and add prefixes
var fnSass = function (path) {
    return gulp.src(path)
        .pipe(plugins.plumber())
        .pipe(plugins.filesize())    // .pipe(plugins.size({ showFiles: true }))
        .pipe(plugins.concat('main.scss'))
        .pipe(plugins.sass({
            sourceComments: 'map'
        }))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.filesize())    // .pipe(plugins.size({ showFiles: true }))
        .pipe(gulp.dest(config.build + '/assets'));
};
gulp.task('styles:sass', function () {
    var files = [config.app + '/sass/main.scss', config.app + '/common/**/*.scss', config.app + '/app/**/*.scss'];
    return fnSass(files);
});

// Minify CSS
gulp.task('styles', ['styles:sass'], function () {
    return gulp.src(config.build + '/assets/*.css')
        .pipe(plugins.bytediff.start())
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.bytediff.stop())
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

// Copy vendor assets to /build/
gulp.task('vendor:assets', function () {
    if (!config.vendor_files.assets.length) {
        return;
    }
    return gulp.src(config.vendor_files.assets)
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
            module: 'ngDevstack.templates',
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

// Concat and minify JavaScript
gulp.task('scripts', ['scripts:lint', 'scripts:cacheTpls', 'vendor:js'], function () {
    var arr = (config.vendor_files.js).concat(config.paths.scripts, config.build + '/app/templates.js');
    return gulp.src(arr)
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.bytediff.start())
        .pipe(plugins.ngmin())
        .pipe(plugins.uglify({
            compress: {
                drop_console: true
            }
        }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.bytediff.stop())
        .pipe(gulp.dest(config.dist + '/assets'));
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
    var arr = (config.vendor_files.assets).concat(config.paths.assets);
    return gulp.src(arr)
        .pipe(plugins.plumber())
        // .pipe(plugins.bytediff.start())
        .pipe(plugins.newer(config.dist + '/assets'))
        // .pipe(plugins.imagemin({ optimizationLevel: 5, progressive: true }))
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

    return gulp.src(inject.css.concat(inject.js), { read: false })
        .pipe(plugins.inject(path, {
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
            css: 'assets/main.min.css',
            js: 'assets/main.min.js'
        }))
        .pipe(gulp.dest(config.dist));
});

// Compile and minify HTML
gulp.task('html', ['html:replace'], function () {
    return gulp.src(config.dist + '/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.minifyHtml({ quotes: true }))
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

gulp.task('test:run', ['scripts:lint', 'scripts:cacheTpls', 'vendor:assets'] , function () {
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

gulp.task('test:watch', ['vendor:assets'], function () {
    gulp.src(testFiles)
        .pipe(plugins.karma({
            configFile: 'karma.conf.js',
            action: 'watch'
        }));
});



// Set up Watch
// ============

// Add files to Watch
gulp.task('watch', ['styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'assets:img', 'vendor:js', 'vendor:assets', 'test:watch', 'html:inject'], function () {
    require('./server.js')(server);

    // watch for JS changes
    gulp.watch(config.paths.scripts, function (event) {
        if (event.path.lastIndexOf('.js') === event.path.length - 3) {
            if (event.type === 'deleted') {
                var buildPath = event.path.replace(config.app, config.build);
                return gulp.src(buildPath, { read: false })
                    .pipe(plugins.rimraf());
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
    gulp.watch(config.paths.sass, function (event) {
        if (event.path.lastIndexOf('.scss') === event.path.length - 5) {
            var files = [
                config.app + '/sass/main.scss',
                config.app + '/+(app|common)/**/*.scss'
            ];
            return fnSass(files).pipe(plugins.livereload(server));
        }
    });

    gulp.watch(config.paths.assets, function (event) {
        if (event.type === 'deleted') {
            var buildPath = event.path.replace(config.app, config.build);
            return gulp.src(buildPath, { read: false })
                .pipe(plugins.rimraf());
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

gulp.task('clean', function () {
    return gulp.src([config.build, config.dist], { read: false })
        .pipe(plugins.rimraf());
});



// Main gulp tasks
// ===============

gulp.task('build', ['clean'], function () {
    gulp.start('styles:sass', 'scripts:lint', 'scripts:cacheTpls', 'vendor:js', 'vendor:assets', 'test:run', 'assets:img', 'html:inject');
});

gulp.task('compile', ['build'], function () {
    gulp.start('styles', 'scripts', 'assets', 'html');
});

gulp.task('default', function () {
    gulp.start('compile');
});
