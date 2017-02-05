class AppNavController {
  /* @ngInject */
  constructor (conf) {
    this.conf = conf;

    console.time('App init');
  }

  $onInit () {}
  $postLink () {}
  $onDestroy () {}
}

export { AppNavController };
