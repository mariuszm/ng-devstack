/* jshint strict: false */

var gulp    = require('gulp'),
    plugins = require('gulp-load-plugins')(),
    server  = require('tiny-lr')();

var config = {
    app   : 'src',
    build : 'build',
    dist  : 'dist'
};

var paths = {
    scripts   : [config.app + '/app/**/!(!(*.js))', config.app + '/common/**/!(!(*.js))'],
    templates : [config.app + '/app/**/!(!(*.tpl.html))', config.app + '/common/**/!(!(*.tpl.html))'],
    sass      : [config.app + '/app/**/!(!(*.scss))', config.app + '/common/**/!(!(*.scss))', config.app + '/sass/**/!(!(*.scss))'],
    assets    : config.app + '/assets/**',
    html      : config.app + '/index.html'
};

var vendor_files = {
    js: [
        'vendor/angular/angular.js',
        'vendor/angular-ui-router/release/angular-ui-router.js',
        'vendor/angular-bootstrap/ui-bootstrap-tpls.js'
    ],
    css: [],
    assets: [
        'vendor/bootstrap-sass-official/vendor/assets/fonts/**/*'
    ]
};

var inject = {
    css : (vendor_files.css).concat(config.build + '/assets/*.css'),
    js  : (vendor_files.js).concat([config.build + '/app/**/*.js', config.build + '/common/**/*.js'])
};


/*
 Subtasks: Watch
 */
gulp.task('watch', ['sass', 'lint', 'html2js', 'vendor_js', 'img', 'vendor_assets', 'inject'], function () {
    require('./server.js')(server);

    gulp.watch(paths.sass, function (event) {
        var files = [config.app + '/sass/main.scss', config.app + '/common/**/*.scss', config.app + '/app/**/*.scss'];
        return fnSass(files).pipe(plugins.livereload(server));
    });

    gulp.watch(paths.templates, function (event) {
        return fnHtml2Js(paths.templates).pipe(plugins.livereload(server));
    });

    gulp.watch(paths.scripts, function (event) {
        return fnLint(event.path).pipe(plugins.livereload(server));
    });

    gulp.watch(paths.assets, function (event) {
        return fnImg(event.path).pipe(plugins.livereload(server));
    });

    gulp.watch(paths.html, function (event) {
        return fnInject(event.path).pipe(plugins.livereload(server));
    });
});


/*
 Subtasks: Clean up
 */
gulp.task('clean', function () {
    return gulp.src([config.build, config.dist], { read: false })
        .pipe(plugins.rimraf());
});


/*
 Subtasks: Compile SASS, Autoprefix and minify
 */
var fnSass = function (path) {
    return gulp.src(path)
        .pipe(plugins.plumber())
        .pipe(plugins.filesize())    // .pipe(plugins.size({ showFiles: true }))
        .pipe(plugins.concat('main.scss'))
        .pipe(plugins.rubySass({ style: 'expanded' }))
        .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(plugins.filesize())    // .pipe(plugins.size({ showFiles: true }))
        .pipe(gulp.dest(config.build + '/assets'));
};
gulp.task('sass', function () {
    var files = [config.app + '/sass/main.scss', config.app + '/common/**/*.scss', config.app + '/app/**/*.scss'];
    return fnSass(files);
});

gulp.task('styles', ['sass'], function () {
    return gulp.src(config.build + '/assets/*.css')
        .pipe(plugins.bytediff.start())
        .pipe(plugins.minifyCss({ keepSpecialComments: 0 }))
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.bytediff.stop())
        .pipe(gulp.dest(config.dist + '/assets'));
});


/*
 Subtasks: JSHint, concat, and minify JavaScript
 */
var fnLint = function (path) {
    return gulp.src(path, { base: 'src' })
        .pipe(plugins.plumber())
        .pipe(plugins.jshint('.jshintrc'))
        .pipe(plugins.jshint.reporter('default'))
        .pipe(gulp.dest(config.build));
};
gulp.task('lint', function () {
    return fnLint(paths.scripts);
});


/*
 Subtask Cache AngularJS templates
*/
var fnHtml2Js = function (path) {
    return gulp.src(path)
        .pipe(plugins.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(plugins.ngHtml2js({
            moduleName: 'templates'
        }))
        .pipe(plugins.concat('app-templates.js'))
        .pipe(gulp.dest(config.build + '/app'));
};
gulp.task('html2js', function () {
    return fnHtml2Js(paths.templates);
});


/*
 Subtask: Copy vendor JS files to /build/
*/
gulp.task('vendor_js', function () {
    if (!vendor_files.js.length) {
        return;
    }
    return gulp.src(vendor_files.js, { base: '.' })
        .pipe(gulp.dest(config.build));
});

gulp.task('scripts', ['lint', 'html2js', 'vendor_js'], function () {
    var arr = vendor_files.js.concat(paths.scripts);
    return gulp.src(arr)
        .pipe(plugins.concat('main.js'))
        .pipe(plugins.bytediff.start())
        .pipe(plugins.ngmin())
        .pipe(plugins.uglify())
        .pipe(plugins.removelogs())
        .pipe(plugins.rename({ suffix: '.min' }))
        .pipe(plugins.bytediff.stop())
        .pipe(gulp.dest(config.dist + '/assets'));
});


/*
 Subtask: Copy vendor assets to /build/
*/
gulp.task('vendor_assets', function () {
    if (!vendor_files.assets.length) {
        return;
    }
    return gulp.src(vendor_files.assets)
        .pipe(gulp.dest(config.build + '/assets'));
});


/*
 Subtasks: Compress Images & copy assets
 */
var fnImg = function (path) {
    return gulp.src(path, { base: 'src' })
        .pipe(gulp.dest(config.build));
};
gulp.task('img', function () {
    return fnImg(paths.assets);
});

gulp.task('assets', ['img', 'vendor_assets'], function () {
    return gulp.src(paths.assets)
        .pipe(plugins.plumber())
        // .pipe(plugins.bytediff.start())
        .pipe(plugins.newer(config.dist + '/assets'))
        // .pipe(plugins.imagemin({ optimizationLevel: 5, progressive: true }))
        // .pipe(plugins.bytediff.stop())
        .pipe(gulp.dest(config.dist + '/assets'));
});


/*
 Subtask: Inject CSS & JS to index.html source
 */
var fnInject = function (path) {
    return gulp.src(inject.css.concat(inject.js), { read: false })
        .pipe(plugins.inject(path, {
            addRootSlash: false,
            ignorePath: ['/', 'build/']
        }))
        .pipe(gulp.dest(config.build));
};
gulp.task('inject', ['sass', 'lint', 'html2js'], function () {
    return fnInject(config.app + '/index.html');
});


/*
 Subtask: Replace non-optimized HTML blocks
 */
gulp.task('html-replace', ['inject'], function () {
    return gulp.src(config.build + '/index.html')
        .pipe(plugins.htmlReplace({
            css: 'assets/main.min.css',
            js: 'assets/main.min.js'
        }))
        .pipe(gulp.dest(config.dist));
});

/*
 Subtasks: Compile and minify HTML
 */
gulp.task('html', ['html-replace'], function () {
    return gulp.src(config.dist + '/index.html')
        .pipe(plugins.plumber())
        .pipe(plugins.minifyHtml({ quotes: true }))
        .pipe(gulp.dest(config.dist));
});




/*
 The default task
 */
gulp.task('build', ['clean'], function () {
    gulp.start('sass', 'lint', 'html2js', 'vendor_js', 'img', 'vendor_assets', 'inject');
});

gulp.task('compile', ['build'], function () {
    gulp.start('styles', 'scripts', 'assets', 'html-replace', 'html');
});

gulp.task('default', function () {
    gulp.start('compile');
});
