vendasApp.controller('UserController', function(UserService) {
    var vm = this;
    vm.title = 'UserController'
    vm.message = 'UserController'
    vm.GetAllUsers = GetAllUsers;
    vm.InsertUser = InsertUser;
    vm.SelectUser = SelectUser;
    vm.UpdateUser = UpdateUser;
    var user = {
        id: 0,
        name: '',
        email: '',
        password: '',
        roles: {
            id: 0,
            authority: ''   
        }
    }

    var role = [
        {
            id: 0,
            authority: ''
        }
    ]

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

    

    

    
})