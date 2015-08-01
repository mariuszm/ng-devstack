# ng-devstack v0.3.4

#### Everything a front-end developer needs to simplify building AngularJS applications.

## Why ng-devstack?

This project has been inspired by another great concept [ngBoilerplate](http://joshdmiller.github.io/ng-boilerplate/), allowing to create modern web applications in [AngularJS](http://angularjs.org/). It follows all the best practices introduced in ngBoilerplate such as component/feature-oriented directory structure, intelligent build system, etc. However, I decided to improve it a little bit and create my own boilerplate from scratch since I missed some basic features like:

- watch for any file changes and apply them to the project in real-time,
- automatically add dependencies to your application without user interaction,
- image optimization,
- remove redundant code on compiling output HTML.

Please welcome **ng-devstack**!

## Features

- integration with [gulp](http://gulpjs.com/),
- package management with [Bower](http://bower.io/),
- feature-oriented directory structure,
- unit testing with [Karma](http://karma-runner.github.io/) and [ng-describe](http://github.com/kensho/ng-describe/),
- synchronised browser testing with [Browsersync](http://www.browsersync.io/),
- auto inject Bower dependencies to application/Karma configuration without user interaction,
- watch for file changes (scripts, styles, templates, assets) and apply them to the project on the fly,
- customize development process with build parameters,
- each AngularJS module separated into separate file (much more suited for bigger applications),
- caching AngularJS templates to avoid additional server requests,
- pre-minifying AngularJS files to fix AngularJS' dependency injection upon minification,
- support for SASS (including Twitter Bootstrap [official SASS port](http://getbootstrap.com/css/#sass)),
- support for SASS source maps,
- support for JSHint,
- support for CSS [Autoprefixer](http://github.com/postcss/autoprefixer-core),
- JS/CSS/HTML minification,
- remove redundancies (`console.log()`, multiple occurrences of `'use strict'` statement, etc.) from compiled JS code,
- image optimization (see [Additional Info](#additional-info) for details),
- `html5Mode` support (see [Additional Info](#additional-info) for details),
- integration with [UI Router](http://angular-ui.github.io/ui-router/) & [UI Bootstrap](http://angular-ui.github.io/bootstrap/).

## Requirements

- NodeJS (v0.12.0 or later)
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

Deploy the production version by running `gulp compile`, or simpler:

```sh
$ gulp
```

For development purposes, run `watch` task to build and start local web server with Browsersync:

```sh
$ gulp watch
```

Please note that by default `watch` process incorporates Karma unit testing along with opening new browser window for local web server. You can disable these features by running `watch` task with additional parameters put in command line. Use `--notest` to disable Karma, or `--nobrowser` to disable opening new browser window. Both can be combined in following way:

```sh
$ gulp watch --notest --nobrowser
```

Also, for unit testing purposes your can disable generating code coverage by Karma by adding `--nocoverage` parameter.

## Additional info

All styles (as well as scripts and templates) added to `src/app/` and `src/common/` should be included to the project automatically - with a small difference to `src/sass/` folder. Partials SASS files (such as variables, mixins, etc.) put into `src/sass/includes/` must be manually imported in `src/sass/_includes.scss` file (you may want to set custom order for loading your styles). Partials located in `src/sass/includes/` should be named with a leading underscore `_`, so the compiler knows not to generate them into a CSS file (see [SASS official site](http://sass-lang.com/guide#topic-4) for details).

Vendor files downloaded with Bower are automatically included into application code and Karma configuration. No longer needed to put them manually!

Unit testing configuration is stored in `karma.conf.default.js`. You don't have to rename it in order to make it working, ng-devstack is generating a valid configuration file for you during development process. Any changes to Karma config should be added to `karma.conf.default.js` default file. Please note that ng-devstack now supports [ng-describe](http://github.com/kensho/ng-describe/) to make unit testing and mocking AngularJS simpler.

If you would like to enable AngularJS HTML5 mode, you have to uncomment following lines in `src/app/app.js` (don't forget to inject `$locationProvider`):

>
```sh
// $locationProvider.html5Mode({
//     enabled: true,
//     requireBase: false
// });
```

In addition, image optimization is turned off by default but in case you need it, don't hesitate to remove comment from the following line in `gulpfile.js`:

>
```sh
// .pipe(plugins.imagemin({ optimizationLevel: 7, progressive: true, interlaced: true }))
```

## TODO

- add authorization service
- add support for i18n internationalization
- improve images/SVG optimization
