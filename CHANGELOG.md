# 0.2.6 (2014-06-08)

## Features

- **tests:**
  - replaced Chrome with faster PhantomJS ([5edf044](https://github.com/mariuszm/ng-devstack/commit/5edf044))
- **misc:**
  - update dependencies in NPM (`package.json`) ([c5de3b1](https://github.com/mariuszm/ng-devstack/commit/c5de3b1))
  - updated docs to v0.2.6 ([363bd9d](https://github.com/mariuszm/ng-devstack/commit/363bd9d))

# 0.2.5 (2014-06-06)

## Features

- **tests:**
  - running tests after build process has ended ([c7ed424](https://github.com/mariuszm/ng-devstack/commit/c7ed424))
- **build:**
  - separate tasks for cleaning build & dist versions ([3e188fb](https://github.com/mariuszm/ng-devstack/commit/3e188fb))
  - improved messaging for SASS compilation task ([7b9ab85](https://github.com/mariuszm/ng-devstack/commit/7b9ab85))
- **misc:**
  - updated file structure ([b0eb32b](https://github.com/mariuszm/ng-devstack/commit/b0eb32b))
  - file naming based on `package.json` ([f568bd0](https://github.com/mariuszm/ng-devstack/commit/f568bd0))
  - update dependencies in NPM (`package.json`) ([dfa11d5](https://github.com/mariuszm/ng-devstack/commit/dfa11d5))
  - updated docs to v0.2.5 ([ff65504](https://github.com/mariuszm/ng-devstack/commit/ff65504))

## Bug Fixes

- **build:**
  - fixed adding vendor CSS files to project ([882c685](https://github.com/mariuszm/ng-devstack/commit/882c685))
- **sass:**
  - fixed compiling SASS to CSS with source maps ([f57221f](https://github.com/mariuszm/ng-devstack/commit/f57221f))
- **watch:**
  - fixed watching for SASS changes ([9ee7b82](https://github.com/mariuszm/ng-devstack/commit/9ee7b82))

# 0.2.4 (2014-05-30)

## Features

- **modules:**
  - create modularized structure of ng-devstack ([607e713](https://github.com/mariuszm/ng-devstack/commit/607e713))
- **sass:**
  - added source maps support ([460fb99](https://github.com/mariuszm/ng-devstack/commit/460fb99))
- **build:**
  - updated build process log messages ([965f4ca](https://github.com/mariuszm/ng-devstack/commit/965f4ca))
- **misc:**
  - updated libraries ([c900208](https://github.com/mariuszm/ng-devstack/commit/c900208))
  - updated docs to v0.2.4 ([53fdd40](https://github.com/mariuszm/ng-devstack/commit/53fdd40))

## Bug Fixes

- **build:**
  - fixed running Autoprefixer on CSS file with source maps ([d4299b4](https://github.com/mariuszm/ng-devstack/commit/d4299b4))

# 0.2.3 (2014-04-09)

## Features

- **jshint:**
  - updated stylish plugin to customize colors ([30e7abd](https://github.com/mariuszm/ng-devstack/commit/30e7abd))
- **sass:**
  - replaced Ruby compiler with faster node-sass ([03a6f48](https://github.com/mariuszm/ng-devstack/commit/03a6f48))
- **build:**
  - removing logs is done by UglifyJS without external plugins ([1708b09](https://github.com/mariuszm/ng-devstack/commit/1708b09))
  - fixed formatting ([a838821](https://github.com/mariuszm/ng-devstack/commit/a838821))
- **misc:**
  - updated libraries ([c0f56ca](https://github.com/mariuszm/ng-devstack/commit/c0f56ca))
  - updated docs to v0.2.3 ([f09ef36](https://github.com/mariuszm/ng-devstack/commit/f09ef36))

## Bug Fixes

- **build:**
  - fixed running Karma after updating to latest version ([3ca9c55](https://github.com/mariuszm/ng-devstack/commit/3ca9c55))

# 0.2.2 (2014-03-05)

## Features

- added Karma ([58edb91](https://github.com/mariuszm/ng-devstack/commit/58edb91))

## Bug Fixes

- **templates:**
  - fixed compiling cached AngularJS templates ([717575b](https://github.com/mariuszm/ng-devstack/commit/717575b))
- **misc:**
  - removed base tag since AngularJS HTML5 mode is disabled by default ([0758344](https://github.com/mariuszm/ng-devstack/commit/0758344))
  - added UI Bootstrap's Collapse plugin into example app's navbar ([717575b](https://github.com/mariuszm/ng-devstack/commit/717575b))
  - updated packages as well as gulp plugins ([717575b](https://github.com/mariuszm/ng-devstack/commit/717575b))

# 0.2.1 (2014-02-16)

## Bug Fixes

- **watch:**
  - fixed caching AngularJS templates ([1e4c989](https://github.com/mariuszm/ng-devstack/commit/1e4c989))

# 0.2.0 (2014-02-15)

## Features

- **watch:**
  - added mirror delete (files removed from `src/` are automatically removed from `build/`) ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **misc:**
  - moved configuration to separate JSON file ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
  - Added comments to gulpfile ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
  - Removed unused plugins from `package.json` ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
  - Updated `README.md` ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))

## Bug Fixes

- **watch:**
  - Livereload crash on adding new files/deleting when Watch task is active ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))
- **Bower:**
  - broken reference to the latest version of AngularUI Router ([c6373e5](https://github.com/mariuszm/ng-devstack/commit/c6373e5))

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
