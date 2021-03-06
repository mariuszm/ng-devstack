# 1.0.4 (2017-07-09)

## Features

- **build**: added support for Visual Code Studio's Debugger for Chrome ([be80ba2](https://github.com/mariuszm/ng-devstack/commit/be80ba2))
- **build**: added webpack 3's Scope Hoisting ([230b248](https://github.com/mariuszm/ng-devstack/commit/230b248))
- **build**: minor code & plugins optimizations ([1df3978](https://github.com/mariuszm/ng-devstack/commit/1df3978))
- **misc**: updated dependencies in Yarn & NPM (package.json) ([1b22cab](https://github.com/mariuszm/ng-devstack/commit/1b22cab))
- **misc**: updated docs to v1.0.4 ([146399f](https://github.com/mariuszm/ng-devstack/commit/146399f), [b72e946](https://github.com/mariuszm/ng-devstack/commit/b72e946))

## Bug Fixes

- **tests**: fixed unit tests after updating Jest to latest version ([b168fa4](https://github.com/mariuszm/ng-devstack/commit/b168fa4))

# 1.0.3 (2017-04-01)

## Features

- **build**: minor code & plugins optimizations ([3df0fe2](https://github.com/mariuszm/ng-devstack/commit/3df0fe2))
- **tests**: replaced Karma launcher with Jest ([7f90421](https://github.com/mariuszm/ng-devstack/commit/7f90421))
- **misc**: updated dependencies in Yarn ([be217b2](https://github.com/mariuszm/ng-devstack/commit/be217b2))
- **misc**: updated docs to v1.0.3 ([9c29105](https://github.com/mariuszm/ng-devstack/commit/9c29105))

# 1.0.2 (2017-02-08)

## Bug Fixes

- **build**: fixed adding `@import` into components’ SASS stylesheets ([5ed7039](https://github.com/mariuszm/ng-devstack/commit/5ed7039))

## Features

- **misc**: removed redundant code, minor styling updates ([9b268b8](https://github.com/mariuszm/ng-devstack/commit/9b268b8))

# 1.0.1 (2017-02-07)

## Bug Fixes

- **build**: tree-shaking is now working with latest release of webpack 2 ([c5350fd](https://github.com/mariuszm/ng-devstack/commit/c5350fd))
- **build**: fixed ng-annotate to work with tree-shaking enabled ([fe465a3](https://github.com/mariuszm/ng-devstack/commit/fe465a3))
- **build**: API updates & bundle processing optimizations ([7ac805e](https://github.com/mariuszm/ng-devstack/commit/7ac805e))

## Features

- **build**: replaced UI Bootstrap with Angular Material ([b70474c](https://github.com/mariuszm/ng-devstack/commit/b70474c))
- **misc**: updated dependencies in `package.json` ([865ef75](https://github.com/mariuszm/ng-devstack/commit/865ef75))
- **misc**: updated docs to v1.0.1 ([022860e](https://github.com/mariuszm/ng-devstack/commit/022860e))

# 1.0.0 (2016-11-20)

## Features

**BREAKING CHANGES**

- **build**: replaced gulp with webpack 2 ([30bccac](https://github.com/mariuszm/ng-devstack/commit/30bccac))
- **build**: added ESLint ([f9575f6](https://github.com/mariuszm/ng-devstack/commit/f9575f6))
- **tests**: updated tests & Karma config to work with webpack and ES6 ([31a6f8b](https://github.com/mariuszm/ng-devstack/commit/31a6f8b))
- **misc**: updated dependencies in `package.json` ([d183ec4](https://github.com/mariuszm/ng-devstack/commit/d183ec4))
- **misc**: updated docs to v1.0.0 ([322a2ef](https://github.com/mariuszm/ng-devstack/commit/322a2ef))

# 0.4.0 (2016-11-12)

## Features

- **build**: introduced Angular 1.5 component architecture ([dcf158f](https://github.com/mariuszm/ng-devstack/commit/dcf158f))
- **tests**: refactored tests to be working with Angular 1.5 component architecture ([6a7305c](https://github.com/mariuszm/ng-devstack/commit/6a7305c))
- **misc**: updated dependencies in NPM and Bower ([858ef93](https://github.com/mariuszm/ng-devstack/commit/858ef93))
- **misc**: minor styling updates ([d642aa1](https://github.com/mariuszm/ng-devstack/commit/d642aa1))

# 0.3.5 (2016-03-06)

## Bug Fixes

- **build**: fixed gulp configuration after latest API changes ([dabd094](https://github.com/mariuszm/ng-devstack/commit/dabd094))
- **sass**: fixed gulp watch crash on SASS compilation errors ([c654389](https://github.com/mariuszm/ng-devstack/commit/c654389))
- **tests**: fixed coverage preprocessor to exclude `*.spec.js` files. See [discussion](https://github.com/karma-runner/karma/pull/834) for details ([08d02f4](https://github.com/mariuszm/ng-devstack/commit/08d02f4))

## Features

- **build**: added cached templates filename to config ([56df9f2](https://github.com/mariuszm/ng-devstack/commit/56df9f2))
- **build**: added source maps support for JavaScript ([d25b706](https://github.com/mariuszm/ng-devstack/commit/d25b706))
- **build**: Karma configuration file is now always being generated during gulp compilation ([da0959a](https://github.com/mariuszm/ng-devstack/commit/da0959a))
- **tests**: added missing tests, refactoring tests ([66cecb0](https://github.com/mariuszm/ng-devstack/commit/66cecb0))
- **misc**: updated dependencies in NPM and Bower ([f2b5e1e](https://github.com/mariuszm/ng-devstack/commit/f2b5e1e))
- **misc**: removed redundant code, minor styling updates ([8ebc94f](https://github.com/mariuszm/ng-devstack/commit/8ebc94f))

# 0.3.4 (2015-08-01)

## Bug Fixes

- **build**: fixed order of imported SASS files ([4f3f92a](https://github.com/mariuszm/ng-devstack/commit/4f3f92a))
- **build**: fixed parsing CSS with Autoprefixer ([9b95f00](https://github.com/mariuszm/ng-devstack/commit/9b95f00))
- **build**: fixed filtering files during optimization process ([31f868d](https://github.com/mariuszm/ng-devstack/commit/31f868d))

## Features

- **tests**: added ng-describe to simplify unit testing and mocking AngularJS ([892603d](https://github.com/mariuszm/ng-devstack/commit/892603d))
- **build**: added new parameter to disable generating code coverage by Karma ([6468af7](https://github.com/mariuszm/ng-devstack/commit/6468af7))
- **build**: fixed running Karma unit testing before final optimization ([7064c59](https://github.com/mariuszm/ng-devstack/commit/7064c59))
- **misc**: updated dependencies in NPM ([2f40fed](https://github.com/mariuszm/ng-devstack/commit/2f40fed))

# 0.3.3 (2015-07-25)

## Bug Fixes

- **tests**: fixed Karma configuration after latest API changes (v0.13.0) ([2219f56](https://github.com/mariuszm/ng-devstack/commit/2219f56))
- **tests**: removed redundant tasks & updated input files ([fcd881c](https://github.com/mariuszm/ng-devstack/commit/fcd881c))
- **build**: updated optimization process ([20e5dbe](https://github.com/mariuszm/ng-devstack/commit/20e5dbe))
- **watch**: clean `build/` folder before running `watch` task ([0445918](https://github.com/mariuszm/ng-devstack/commit/0445918))

## Features

**BREAKING CHANGES**

- added wiredep to wire Bower dependencies to source code ([518dde5](https://github.com/mariuszm/ng-devstack/commit/518dde5))
- fixed auto injecting Bower dependencies to Karma config ([f206ea3](https://github.com/mariuszm/ng-devstack/commit/f206ea3))
- **build**: added parameters to customise build/watch process ([23fe2c4](https://github.com/mariuszm/ng-devstack/commit/23fe2c4))
- **server**: replaced LiveReload with Browsersync ([588ebc1](https://github.com/mariuszm/ng-devstack/commit/588ebc1))
- **misc**: updated dependencies in NPM and Bower ([1b6827f](https://github.com/mariuszm/ng-devstack/commit/1b6827f))

# 0.3.2 (2014-10-12)

## Bug Fixes

- **build**: `'use script'` statement wrapped with a function to affect only this function and prevent problems with concatenating scripts that aren't strict ([1d9ca9b](https://github.com/mariuszm/ng-devstack/commit/1d9ca9b))
- **build**: fixed running JS maintenance task ([684d125](https://github.com/mariuszm/ng-devstack/commit/684d125))
- **build**: forced deleting redundant JS files ([fd4dc66](https://github.com/mariuszm/ng-devstack/commit/fd4dc66))

# 0.3.1 (2014-10-09)

## Bug Fixes

- **build**: fixed copying unnecessary CSS files to `dist/` ([0bd8f4a](https://github.com/mariuszm/ng-devstack/commit/0bd8f4a))
- **build**: added helper function to fix problem with Windows paths in SASS task ([e42bbed](https://github.com/mariuszm/ng-devstack/commit/e42bbed))
- **update**: updated server config after migrating to Express 4 ([616f046](https://github.com/mariuszm/ng-devstack/commit/616f046))
- **update**: fixed compiling SASS with source maps after updating node-sass and Autoprefixer to latest version ([31a299b](https://github.com/mariuszm/ng-devstack/commit/31a299b))
- **update**: fixed CSS & JS injection to HTML according to latest API changes ([6aab772](https://github.com/mariuszm/ng-devstack/commit/6aab772))

## Features

- **build**: replaced deprecated plugins ([37cff86](https://github.com/mariuszm/ng-devstack/commit/37cff86), [49048f8](https://github.com/mariuszm/ng-devstack/commit/49048f8))
- **build**: renamed task `clean:compile` to `clean:dist` for convenience ([a78d21c](https://github.com/mariuszm/ng-devstack/commit/a78d21c))
- **build**: fixed multiple occurrences of `'use strict'` statement ([c16a692](https://github.com/mariuszm/ng-devstack/commit/c16a692))
- **build**: application files separated from vendor files for final maintenance ([a45951d](https://github.com/mariuszm/ng-devstack/commit/a45951d))
- **misc**: JavaScript files moved to the bottom of the page ([cde391b](https://github.com/mariuszm/ng-devstack/commit/cde391b))
- **misc**: updated dependencies in NPM and Bower ([8eff9ff](https://github.com/mariuszm/ng-devstack/commit/8eff9ff))

# 0.3.0 (2014-07-01)

## Bug Fixes

- **compile**: fixed removing temporary SASS file ([368cb47](https://github.com/mariuszm/ng-devstack/commit/368cb47))
- **watch**: fixed rebuilding CSS on SASS change ([c094769](https://github.com/mariuszm/ng-devstack/commit/c094769))

## Features

- **misc**: updated dependencies in NPM and Bower ([757e018](https://github.com/mariuszm/ng-devstack/commit/757e018))

# 0.2.9 (2014-07-01)

## Bug Fixes

- **build**: fixed paths for the latest version of Twitter Bootstrap ([bc21e44](https://github.com/mariuszm/ng-devstack/commit/bc21e44))
- **build**: fixed removing temporary SASS file ([6d4ed45](https://github.com/mariuszm/ng-devstack/commit/6d4ed45))
- **build**: fixed AngularJS modules minification (removed saving temporary file to disk) ([0ab24d3](https://github.com/mariuszm/ng-devstack/commit/0ab24d3))

## Features

- **build**: added forced clean of compiled version ([ba3382e](https://github.com/mariuszm/ng-devstack/commit/ba3382e))

# 0.2.8 (2014-06-25)

## Bug Fixes

- **build**: fixed injecting templates module (module name not related to project's name defined in package.json anymore) ([877338d](https://github.com/mariuszm/ng-devstack/commit/877338d))
- **sass**: fixed importing partial SASS files ([aa9728c](https://github.com/mariuszm/ng-devstack/commit/aa9728c))
- **watch**: fixed rebuilding CSS on SASS change ([0ede1af](https://github.com/mariuszm/ng-devstack/commit/0ede1af))

## Features

- **build**: running tests after the build process is finished ([3ddcbc7](https://github.com/mariuszm/ng-devstack/commit/3ddcbc7))
- **misc**: fixed formatting ([0f505e6](https://github.com/mariuszm/ng-devstack/commit/0f505e6))
- **misc**: updated dependencies in NPM and Bower ([8b6c087](https://github.com/mariuszm/ng-devstack/commit/8b6c087))

# 0.2.7 (2014-06-09)

## Bug Fixes

- **build**: fixed HTML minification ([dbeafef](https://github.com/mariuszm/ng-devstack/commit/dbeafef))
- **build**: fixed compiling JavaScript files ([41811df](https://github.com/mariuszm/ng-devstack/commit/41811df))
- **build**: fixed including vendor files in application ([f618f5b](https://github.com/mariuszm/ng-devstack/commit/f618f5b))

## Features

- **build**: added example SASS file for variables ([9f9dc49](https://github.com/mariuszm/ng-devstack/commit/9f9dc49))
- **misc**: updated dependencies in Bower ([331f3c7](https://github.com/mariuszm/ng-devstack/commit/331f3c7))

# 0.2.6 (2014-06-08)

## Features

- **tests**: replaced Chrome with faster PhantomJS ([5edf044](https://github.com/mariuszm/ng-devstack/commit/5edf044))
- **misc**: updated dependencies in NPM (`package.json`) ([c5de3b1](https://github.com/mariuszm/ng-devstack/commit/c5de3b1))
- **misc**: updated docs to v0.2.6 ([363bd9d](https://github.com/mariuszm/ng-devstack/commit/363bd9d))

# 0.2.5 (2014-06-06)

## Bug Fixes

- **build**: fixed adding vendor CSS files to project ([882c685](https://github.com/mariuszm/ng-devstack/commit/882c685))
- **sass**: fixed compiling SASS to CSS with source maps ([f57221f](https://github.com/mariuszm/ng-devstack/commit/f57221f))
- **watch**: fixed watching for SASS changes ([9ee7b82](https://github.com/mariuszm/ng-devstack/commit/9ee7b82))

## Features

- **tests**: running tests after build process has ended ([c7ed424](https://github.com/mariuszm/ng-devstack/commit/c7ed424))
- **build**: separate tasks for cleaning build & dist versions ([3e188fb](https://github.com/mariuszm/ng-devstack/commit/3e188fb))
- **build**: improved messaging for SASS compilation task ([7b9ab85](https://github.com/mariuszm/ng-devstack/commit/7b9ab85))
- **misc**: updated file structure ([b0eb32b](https://github.com/mariuszm/ng-devstack/commit/b0eb32b))
- **misc**: file naming based on `package.json` ([f568bd0](https://github.com/mariuszm/ng-devstack/commit/f568bd0))
- **misc**: updated dependencies in NPM (`package.json`) ([dfa11d5](https://github.com/mariuszm/ng-devstack/commit/dfa11d5))
- **misc**: updated docs to v0.2.5 ([ff65504](https://github.com/mariuszm/ng-devstack/commit/ff65504))

# 0.2.4 (2014-05-30)

## Bug Fixes

- **build**: fixed running Autoprefixer on CSS file with source maps ([d4299b4](https://github.com/mariuszm/ng-devstack/commit/d4299b4))

## Features

- **modules**: create modularized structure of ng-devstack ([607e713](https://github.com/mariuszm/ng-devstack/commit/607e713))
- **sass**: added source maps support ([460fb99](https://github.com/mariuszm/ng-devstack/commit/460fb99))
- **build**: updated build process log messages ([965f4ca](https://github.com/mariuszm/ng-devstack/commit/965f4ca))
- **misc**: updated libraries ([c900208](https://github.com/mariuszm/ng-devstack/commit/c900208))
- **misc**: updated docs to v0.2.4 ([53fdd40](https://github.com/mariuszm/ng-devstack/commit/53fdd40))

# 0.2.3 (2014-04-09)

## Bug Fixes

- **build**: fixed running Karma after updating to latest version ([3ca9c55](https://github.com/mariuszm/ng-devstack/commit/3ca9c55))

## Features

- **jshint**: updated stylish plugin to customize colors ([30e7abd](https://github.com/mariuszm/ng-devstack/commit/30e7abd))
- **sass**: replaced Ruby compiler with faster node-sass ([03a6f48](https://github.com/mariuszm/ng-devstack/commit/03a6f48))
- **build**: removing logs is done by UglifyJS without external plugins ([1708b09](https://github.com/mariuszm/ng-devstack/commit/1708b09))
- **build**: fixed formatting ([a838821](https://github.com/mariuszm/ng-devstack/commit/a838821))
- **misc**: updated libraries ([c0f56ca](https://github.com/mariuszm/ng-devstack/commit/c0f56ca))
- **misc**: updated docs to v0.2.3 ([f09ef36](https://github.com/mariuszm/ng-devstack/commit/f09ef36))

# 0.2.2 (2014-03-05)

## Bug Fixes

- **templates**: fixed compiling cached AngularJS templates ([717575b](https://github.com/mariuszm/ng-devstack/commit/717575b))
- **misc**: removed base tag since AngularJS HTML5 mode is disabled by default ([0758344](https://github.com/mariuszm/ng-devstack/commit/0758344))
- **misc**: added UI Bootstrap's Collapse plugin into example app's navbar ([717575b](https://github.com/mariuszm/ng-devstack/commit/717575b))
- **misc**: updated packages as well as gulp plugins ([717575b](https://github.com/mariuszm/ng-devstack/commit/717575b))

## Features

- added Karma ([58edb91](https://github.com/mariuszm/ng-devstack/commit/58edb91))

# 0.2.1 (2014-02-16)

## Bug Fixes

- **watch**: fixed caching AngularJS templates ([1e4c989](https://github.com/mariuszm/ng-devstack/commit/1e4c989))

# 0.2.0 (2014-02-15)

## Bug Fixes

- **watch**: Livereload crash on adding new files/deleting when Watch task is active ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **Bower**: broken reference to the latest version of AngularUI Router ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))

## Features

- **watch**: added mirror delete (files removed from `src/` are automatically removed from `build/`) ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **misc**: moved configuration to separate JSON file ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **misc**: Added comments to gulpfile ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **misc**: Removed unused plugins from `package.json` ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **misc**: Updated `README.md` ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))

# 0.1.0 (2014-02-12)

## Features

- integration with gulp ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- dependency management with Bower ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- feature-oriented directory structure ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- Livereload fully handled server-side with NodeJS/Express ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- real-time applying changes to website on adding new files ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- caching AngularJS templates ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- pre-minifying AngularJS files ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- support for SASS (including Twitter Bootstrap official port to SASS) ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- support for JSHint ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- JS/CSS/HTML minification ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- remove logging (`console.log()`, etc.) from compiled JS code ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- images optimization ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- `html5Mode` support ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
- integration with AngularUI Router & AngularUI Bootstrap ([6540c51](https://github.com/mariuszm/ng-devstack/commit/6540c51))
