vendasApp.controller('UserController', function(UserService) {
    var vm = this;
    vm.title = 'UserController'
    vm.message = 'UserController'
    vm.GetAllUsers = GetAllUsers;
    vm.InsertUser = InsertUser;
    vm.SelectUser = SelectUser;
    vm.UpdateUser = UpdateUser;
    vm.DeleteUser = DeleteUser;
    vm.SelectRole = SelectRole;
    vm.GetRoles = GetRoles;

    function SelectUser (user) {
        vm.user = user
        console.log(vm.user);
        return vm.user;
    }

   

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

    function InsertUser() {
        var user = vm.user;
        var roles = vm.GetRoles();
        var role = SelectRole(vm.role)
        user.roles[{role}];
        
        var insertUser = UserService.insert(user);
        insertUser.then(function(response) {
            vm.users = response.data.content;
            console.log(response.data.content);
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    function UpdateUser() {
        var user = vm.user;

        var updateUser = UserService.update(user);
        updateUser.then(function(response) {
            vm.users = response.data.content;
            console.log(response.data.content);
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    function DeleteUser() {
        var user = vm.user;

        var deleteUser = UserService.delete(user);
        deleteUser.then(function(response) {
            vm.users = response.data.content;
            console.log(response.data.content);
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    function GetRoles() {
        var roles = [];
        roles = vm.roles;
        var getRoles = UserService.getRoles();
        getRoles.then(function(response) {
            vm.roles = response.data;
            console.log(response.data);
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
    }

    GetRoles();

    function SelectRole (role) {
        vm.role = role
        console.log(vm.role);
        return vm.role;
    }

})