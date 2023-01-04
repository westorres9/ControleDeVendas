myApp.controller('adminCtrl', function(AuthService) {
    vm = this;
    vm.title = 'adminCtrl'
    vm.logout = logout;
    
    

    function logout() {
        AuthService.removeToken();
    }

    var user = AuthService.getUserName();

    console.log(user);
    vm.user = user + '!!';
    console.log(vm.user);
    
    var USER_ROLE = AuthService.getAuthority();
    console.log(USER_ROLE);
    console.log(vm.USER_ROLE)
    vm.USER_ROLE = USER_ROLE;
})