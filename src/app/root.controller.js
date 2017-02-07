class RootController {
  /* @ngInject */
  constructor (conf, $transitions) {
    this.conf = conf;
    this.$transitions = $transitions;

    console.time('App init');
  }

  $onInit () {
    let stateValid = {
      from: (state) => !!(state.name)
    };

    this.transitionStart = this.$transitions.onStart(stateValid, ($transition$) => {
      console.time(`[$transition] ${$transition$.$from().name} -> ${$transition$.$to().name}`);
    });

    this.transitionEnd = this.$transitions.onSuccess(stateValid, ($transition$) => {
      console.timeEnd(`[$transition] ${$transition$.$from().name} -> ${$transition$.$to().name}`);
    });
  }

  $postLink () {
    console.timeEnd('App init');
  }

  $onDestroy () {
    this.transitionStart();
    this.transitionEnd();
  }

}

export { RootController };
