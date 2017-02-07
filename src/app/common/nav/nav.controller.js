class AppNavController {
  /* @ngInject */
  constructor ($transitions) {
    this.$transitions = $transitions;
  }

  $onInit () {
    this.transitionEnd = this.$transitions.onSuccess(null, ($transition$) => {
      this.currentNavItem = $transition$.$to().name;
    });
  }

  $postLink () {}

  $onDestroy () {
    this.transitionEnd();
  }
}

export { AppNavController };
