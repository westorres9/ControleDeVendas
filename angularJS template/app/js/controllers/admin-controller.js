myapp.controller('adminCtrl', function($mdSidenav, AuthService) {
    vm = this;
    vm.title = 'Bem Vindo'
    vm.toggleLeft = buildToggler('left');

    const user = AuthService.getUsername();
    vm.user = user;

    const USER_ROLE = AuthService.getAuthority();
    vm.USER_ROLE = USER_ROLE;
    console.log(vm.USER_ROLE.authority)

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle();
      };
    }
})


