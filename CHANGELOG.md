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
