vendasApp.controller('usersController', function(UserService ,AuthService ) {
    var vm = this;
    vm.title = 'usersController';
    vm.GetAllUsers = GetAllUsers;
    vm.SelectUser = SelectUser;
    var USER_ROLE = AuthService.getAuthority();
    vm.USER_ROLE = USER_ROLE;

    function SelectUser(user) {
        vm.user = user;
        console.log(vm.user)
        return vm.user;
    }

    function GetAllUsers () {
        var getAllUsers = UserService.getAllUsers();

        getAllUsers.then(function(response) {
            vm.users = response.data.content;
            console.log(vm.users)
        })
         .catch(function(error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400 ) {
                window.location.href = '/index.html#/login';
            }
        })
    }

    GetAllUsers();
    
})