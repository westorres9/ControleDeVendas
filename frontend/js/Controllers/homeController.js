vendasApp.controller('homeController', function (AuthService) {
    var vm = this;
    vm.title = 'homeController'
    vm.message = 'Seja bem vindo (a) ';
    
    vm.logout = logout;
    function logout () {
        AuthService.logout();
    } 

    var user = AuthService.getToken();
    vm.user = user.userName + '!!';
    var USER_ROLE = AuthService.getAuthority();
    console.log(USER_ROLE);
    vm.USER_ROLE = USER_ROLE;
    console.log(vm.USER_ROLE);
    console.log(user.userName);

})