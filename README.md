# ng-devstack v0.1.0

#### Everything a front-end developer needs to simplify building AngularJS applications.

## Why ng-devstack?

This project has been inspired by another great concept [ngBoilerplate](http://joshdmiller.github.io/ng-boilerplate/), allowing to create modern web applications in AngularJS. It follows all the best practices introduced in ngBoilerplate such as component/feature-oriented directory structure, intelligent build system, etc. However, I decided to improve it a little bit and create my own boilerplate since I missed some basic features like:

* applying changes in real-time on adding new files to project,
* image optimization,
* remove redundant code on compiling output HTML,
* plus ngBoilerplate hasn't been updated for months.

Now this all has been made possible. Please welcome **ng-devstack**!

## Features

* integration with gulp.js,
* package management with Bower,
* feature-oriented directory structure,
* Livereload fully handled server-side with NodeJS/Express (without installing additional extensions for browsers),
* real-time applying changes to website on adding new files (forget about manual rebuild the app),
* caching AngularJS templates to avoid additional server requests,
* pre-minifying AngularJS files to fix AngularJS' dependency injection upon minification,
* support for SASS (including Twitter Bootstrap official port to SASS),
* support for JSHint,
* minify JS/CSS/HTML,
* remove logging (`console.log()`, etc.) from compiled JS code,
* image optimization on build (see *Additional Info* for details),
* `html5Mode` support (see *Additional Info* for details),
* integration with AngularUI Router & AngularUI Bootstrap.

## Requirements

* Ruby
* NodeJS
* Bower

## Installation

**1.** Install SASS:

```sh
$ gem install sass
```

**2.** Install gulp globally, which is giving access to gulp's CLI:

```sh
$ npm install gulp -g
```

**3.** Install gulp locally to the project with other required plugins:

```sh
$ npm install
```

**4.** Install dependencies:

```sh
$ bower install
```

## Usage

To build the application simply type:

```sh
$ gulp build
```

For development purposes, run watch task to build and start local web server with Livereload:

```sh
$ gulp watch
```

Deploy the production version by running `gulp compile`, or more simple:

```sh
$ gulp
```

## Additional info
If you would like to enable AngularJS HTML5 mode, you have to uncomment 2 lines in `src/app/app.js` and `server.js`:
* `src/app/app.js`:

>
```
// $locationProvider.html5Mode(true);
```

* `server.js`:

>
```
// app.use(require('connect-modrewrite')(['!\\.\\w+$ /index.html']));
```

In addition, image optimization is turned off by default but in case you need it, don't hesitate to remove comment from the following line in `gulpfile.js`:

>
```
// .pipe(plugins.imagemin({ optimizationLevel: 5, progressive: true }))
```

## TODO

- add authorization service
- add E2E testing (Karma/Protractor)
- add source maps support for SASS & JS
- improve images/SVG optimization
- update gulp configuration
- add more comments to gulpfile
- improve README.md
