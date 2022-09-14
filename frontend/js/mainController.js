vendasApp.controller('mainController', function(AuthService) {
    var vm = this;
    vm.title = 'mainController'
    vm.message = 'Hello Angular'  
    vm.USER_ROLE = AuthService.getAuthority();
    console.log(vm.USER_ROLE);
})