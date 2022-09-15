vendasApp.controller('mainController', function(AuthService) {
    var vm = this;
    vm.title = 'mainController'
    vm.message = 'Hello Angular'  
    vm.USER_ROLE = AuthService.getAuthority();
    vm.USER_NAME = AuthService.getUserName();
    vm.logout = AuthService.logout();
    vm.token = AuthService.getToken();
})