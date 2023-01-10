myapp.controller('mainCtrl', function(AuthService) {
    vm = this;
    vm.setTitle = setTitle;


    function setTitle() {
        let token = AuthService.getToken();
        if(token == undefined || null) {
            vm.title = 'Login'
        }
        else {
            vm.title = 'Logout'
        }
    }

    setTitle();
})