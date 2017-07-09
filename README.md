# ng-devstack v1.0.4

#### Everything a front-end developer needs to simplify building AngularJS applications.

## Why ng-devstack?

It's been a while since the first version of ng-devstack has arrived. Based on old ecosystem (including gulp, ES5, etc.) it wouldn't survive long in today's world of dynamically changing front-end technologies.
This is the time to introduce **major upgrade**, which incorporates most recent techniques and best practices.
Hopefully, it will make the switch to Angular 2 less painful.

Anyone searching for old version of ng-devstack, it is [here](https://github.com/mariuszm/ng-devstack/tree/0.4.0).

## Features

- new Angular 1.5 component architecture,
- support for ES6 with [Babel 6](https://babeljs.io/),
- integration with [webpack 3](https://webpack.github.io/), allowing to use its' best features:
  - local webserver with live reload,
  - Hot Module Reloading, tries to reload just the component that's changed, instead of the entire page),
  - Scope Hoisting, removing function wrappers around modules to improve total script evaluation time as well as to achieve smaller bundle sizes,
  - support for styles/scripts source maps,
  - JS/CSS/HTML minification,
- support for SASS (processed with [Autoprefixer](https://github.com/postcss/autoprefixer)),
- support for [ESLint](http://eslint.org/),
- unit testing with [Jest](https://facebook.github.io/jest/),
- integration with [UI Router 1.0](https://ui-router.github.io/ng1/) & [Angular Material](https://material.angularjs.org/)
- debugging with Visual Code Studio's [Debugger for Chrome](https://github.com/Microsoft/vscode-chrome-debug).

## Requirements

- NodeJS (v0.12.0 or later)
- Yarn

## Installation

Install project dependencies with other required plugins:

```sh
$ yarn
```

## Usage

Build the production version, minified and ready to deploy by typing:

```sh
$ yarn build
```

For development purposes, run `dev` script to start local web server and debug your application:

```sh
$ yarn dev
```

Run Jest unit testing by:

```sh
$ yarn test

// or

$ yarn test:coverage
```

You can also observe unit testing results continuously, by starting `test:watch` script. The watcher does not require simultaneous `yarn dev` process to work:

```sh
$ yarn test:watch
```

ESLint is loaded by default when webpack is processing files, but it can be run as a standalone task:

```sh
$ yarn lint
```

## Debugging in Chrome

For Visual Code Studio users there is a configuration file `launch.json` provided to allow in-editor debugging (with support for source maps). You can launch a new Google Chrome window or attach to existing one. For the second option, browser window shall be launched with remote debugging enabled:

```sh
/Applications/Google\ Chrome.app/Contents/MacOS/Google\ Chrome --remote-debugging-port=9222 --user-data-dir=remote-profile
```

Of course Google Chrome path may differ depending on your system environment - please make sure to run the browser from proper path with these two parameters included. Pathname for `sourceMapPathOverrides` can be different for different OS, visit [Debugger for Chrome](https://github.com/Microsoft/vscode-chrome-debug) for more information.

## Additional info

If you would like to enable AngularJS HTML5 mode, you have to uncomment following lines in `src/app/root.module.js` (don't forget to inject `$locationProvider`):

>
```sh
// $locationProvider.html5Mode({
//     enabled: true,
//     requireBase: false
// });
```

Since Angular 1.5 introduced `.component()` helper method, which advocates best practices and common default behaviors, it is allowed to write in an Angular 2 style as well. To reflect component architecture practices, the project structure of application created with ng-devstack had to be upgraded. Largely inspired by Todd Motto's [Angular 1.x styleguide](https://github.com/toddmotto/angular-styleguide/tree/angular-old-es5), here's an example project structure:

```
├── app/
|   ├── common/
|   |   ├── nav/
|   |   |   ├── nav.module.js
|   |   |   ├── nav.component.js
|   |   |   ├── nav.service.js
|   |   |   ├── nav.spec.js
|   |   |   ├── nav.html
|   |   |   └── nav.scss
|   |   ├── footer/
|   |   |   ├── footer.module.js
|   |   |   ├── footer.component.js
|   |   |   ├── footer.service.js
|   |   |   ├── footer.spec.js
|   |   |   ├── footer.html
|   |   |   └── footer.scss
|   |   └── common.module.js
│   ├── components/
|   |   ├── home/
|   |   |   ├── home.module.js
|   |   |   ├── home.component.js
|   |   |   ├── home.directive.js
|   |   |   ├── home.service.js
|   |   |   ├── home.spec.js
|   |   |   ├── home.html
|   |   |   └── home.scss
|   |   ├── about/
|   |   |   ├── about-contact/
|   |   |   |   ├── about-contact.module.js
|   |   |   |   ├── about-contact.component.js
|   |   |   |   ├── about-contact.service.js
|   |   |   |   ├── about-contact.spec.js
|   |   |   |   ├── about-contact.html
|   |   |   |   └── about-contact.scss
|   |   |   ├── about.module.js
|   |   |   ├── about.component.js
|   |   |   ├── about.directive.js
|   |   |   ├── about.service.js
|   |   |   ├── about.spec.js
|   |   |   ├── about.html
|   |   |   └── about.scss
|   |   └── components.module.js
|   ├── root.module.js
|   ├── root.component.js
|   └── root.spec.js
└── index.html
```

## TODO

- add TypeScript 2.0,
- add Redux,
- add example usage of EventEmitter,
- add authorization service,
- add image optimization.
