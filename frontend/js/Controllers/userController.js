vendasApp.controller('UserController', function(UserService) {
    var vm = this;
    vm.title = 'UserController'
    vm.message = 'UserController'
    vm.GetAllUsers = GetAllUsers;
    vm.InsertUser = InsertUser;
    vm.SelectUser = SelectUser;
    vm.UpdateUser = UpdateUser;
    vm.DeleteUser = DeleteUser;
    vm.roless = roless;
    var role = vm.role;
    

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
        var role = vm.role
        vm.user.roles(role)
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

        var insertUser = UserService.update(user);
        insertUser.then(function(response) {
            vm.users = response.data;
            console.log(response.data);
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
        
    }

    function DeleteUser() {
        var user = vm.user;

        var deleteUser = UserService.delete(user);
        deleteUser.then(function(response) {
            vm.users = response.data;
            console.log(response.data);
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        })
        
    }

    function roless() {
        vm.roles = [
            {
                "id": 1,
                "authority": "ROLE_SELLER"
            },
            {
                "id": 2,
                "authority": "ROLE_MANAGER"
            },
            {
                "id": 3,
                "authority": "ROLE_ADMIN"
            }
        ];
        console.log(vm.roles)
        return vm.roles;
    } 

    roless();

    

    
})