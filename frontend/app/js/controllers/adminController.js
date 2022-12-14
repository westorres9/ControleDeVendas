vendasApp.controller('adminController', function(AuthService) {
    var vm = this;
    vm.title = 'adminController';
    vm.logout = logout;

    function logout() {
        AuthService.removeToken();
        token = AuthService.getToken();
    }
    
})