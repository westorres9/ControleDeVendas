vendasApp.controller('homeController', function (AuthService) {
    var vm = this;
    vm.title = 'homeController'
    vm.message = 'Controle Vendas'

    var USER_ROLE = AuthService.getAuthority();
    console.log(USER_ROLE);
    vm.USER_ROLE = USER_ROLE;
    console.log(vm.USER_ROLE);

})