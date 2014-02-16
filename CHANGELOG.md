# 0.2.1 (2014-02-16)

## Bug Fixes

- **watch:**
  - fixed caching AngularJS templates

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
