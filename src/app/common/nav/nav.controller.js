class AppNavController {
  constructor (conf) {
    'ngInject';
    this.conf = conf;

    console.time('App init');
  }

  $onInit () {}
  $postLink () {}
  $onDestroy () {}
}

export { AppNavController };
