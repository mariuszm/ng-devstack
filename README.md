# ng-devstack v0.2.8

#### Everything a front-end developer needs to simplify building AngularJS applications.

## Why ng-devstack?

This project has been inspired by another great concept [ngBoilerplate](http://joshdmiller.github.io/ng-boilerplate/), allowing to create modern web applications in [AngularJS](http://angularjs.org/). It follows all the best practices introduced in ngBoilerplate such as component/feature-oriented directory structure, intelligent build system, etc. However, I decided to improve it a little bit and create my own boilerplate from scratch since I missed some basic features like:

- watch for any file changes and apply them to the project in real-time,
- image optimization,
- remove redundant code on compiling output HTML,
- plus ngBoilerplate hasn't been updated for months.

Now this all has been made possible. Please welcome **ng-devstack**!

## Features

- integration with [gulp](http://gulpjs.com/),
- package management with [Bower](http://bower.io/),
- feature-oriented directory structure,
- unit testing with Karma,
- LiveReload fully handled server-side with NodeJS/Express (without installing additional extensions for browsers),
- watch for file changes (scripts, styles, templates, assets) and apply them to the project on the fly,
- each AngularJS module separated into separate file (much more suited for bigger applications),
- caching AngularJS templates to avoid additional server requests,
- pre-minifying AngularJS files to fix AngularJS' dependency injection upon minification,
- support for SASS (including Twitter Bootstrap [official SASS port](http://getbootstrap.com/css/#sass)),
- support for SASS source maps,
- support for JSHint,
- JS/CSS/HTML minification,
- remove logging (`console.log()`, etc.) from compiled JS code,
- image optimization (see [Additional Info](#additional-info) for details),
- `html5Mode` support (see [Additional Info](#additional-info) for details),
- integration with [UI Router](http://angular-ui.github.io/ui-router/) & [UI Bootstrap](http://angular-ui.github.io/bootstrap/).

## Requirements

- NodeJS
- Bower

## Installation

**1.** Install gulp globally, which is giving access to gulp's CLI:

```sh
$ npm install gulp -g
```

**2.** Install gulp locally to the project with other required plugins:

```sh
$ npm install
```

**3.** Install required libraries:

```sh
$ bower install
```

## Usage

To build the application simply type:

```sh
$ gulp build
```

For development purposes, run watch task to build and start local web server with LiveReload:

```sh
$ gulp watch
```

Deploy the production version by running `gulp compile`, or simpler:

```sh
$ gulp
```

## Additional info

All styles (as well as scripts and templates) added to `src/app/` and `src/common/` should be included to the project automatically - with a small difference to `src/sass/` folder. Partials SASS files (such as variables, mixins, etc.) put into `src/sass/includes/` must be manually imported in `src/sass/_includes.scss` file (you may want to set custom order for loading your styles). Partials located in `src/sass/includes/` should be named with a leading underscore `_`, so the compiler knows not to generate them into a CSS file (see [SASS official site](http://sass-lang.com/guide#topic-4) for details).

Vendor files downloaded with Bower can be added to project by editing `'vendor_files'` section in `config.json` file. The rest of this file should remain unchanged.

If you would like to enable AngularJS HTML5 mode, you have to uncomment 2 lines in `src/app/app.js` and `server.js`:

- `src/app/app.js` (don't forget to inject `$locationProvider`):

>
```sh
// $locationProvider.html5Mode(true);
```

- `server.js`:

>
```sh
// app.use(require('connect-modrewrite')(['!\\.\\w+$ /index.html']));
```

In addition, image optimization is turned off by default but in case you need it, don't hesitate to remove comment from the following line in `gulpfile.js`:

>
```sh
// .pipe(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
```

## Known issues

Support for source maps in the latest version of node-sass (v0.9.1) is broken, so older version of gulp-sass (depending on older node-sass) will be used as a temporary solution (see the discussions at [gulp-sass](https://github.com/dlmanning/gulp-sass/issues/57) and [node-sass](https://github.com/sass/node-sass/issues/337)).

## TODO

- add support for external sources in vendor files (http://*)
- substitute local vendor files with CDN resources
- add authorization service
- improve images/SVG optimization
