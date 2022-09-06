vendasApp.controller('UserController', function(UserService) {
    var vm = this;
    vm.title = 'UserController'
    vm.message = 'UserController'

    function GetAllUsers () {
        var getAllUsers = UserService.getUsers();

        getAllUsers.then(function(response) {
            vm.users = response.data.content;
            console.log(response.data.content);
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    GetAllUsers();
})