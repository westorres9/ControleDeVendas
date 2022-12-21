myApp.controller('userCtrl', function(UserService) {
    vm = this;
    vm.title = 'userCtrl'
    vm.GetAllUsers = GetAllUsers;
    vm.SelectUser = SelectUser;
    vm.InsertUser = InsertUser;
    vm.UpdateUser = UpdateUser;
    vm.DeleteUser = DeleteUser;
    vm.ShowForm = ShowForm;
    vm.CloseForm = CloseForm;
    vm.ShowFormNew = ShowFormNew;
    vm.CloseFormNew = CloseFormNew;
    vm.ShowWarning = ShowWarning;
    vm.CloseWarning = CloseWarning;
    vm.SelectToDelete = SelectToDelete;
    var formNewVisible = false;
    vm.formNewVisible = formNewVisible;
    var formVisible = false;
    vm.formVisible = formVisible;
    var warningVisible = false;
    vm.warningVisible = warningVisible;

    function ShowWarning() {
        vm.warningVisible = true;
        console.log('warningVisible', vm.warningVisible)
    }

    function CloseWarning () {
        vm.warningVisible = false;
        console.log('warningVisible', vm.warningVisible)
    }

    function ShowFormNew() {
        vm.formNewVisible = true;
        console.log('formNewVisible', vm.formNewVisible)
    }

    function CloseFormNew() {
        vm.formNewVisible = false
        console.log('formNewVisible', vm.formNewVisible)
    }

    function ShowForm() {
        vm.formVisible = true;
        console.log('formVisible', vm.formVisible)
    }

    function CloseForm() {
        vm.formVisible = false
        console.log('formVisible', vm.formVisible)
    }

    function GetAllUsers() {
        var getAllUsers = UserService.getAllUsers();
        getAllUsers.then(function(response) {
            vm.users = response.data.content;
            console.log(vm.users);
        }).catch(function (error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400) {
                window.location.href = '/index.html#/login';
            }
        })
    }
    GetAllUsers();

    function SelectUser(user) {
        ShowForm();
        vm.user = user;
        console.log(vm.user);
        return vm.user;
    }

    function SelectToDelete(user) {
        ShowWarning();
        vm.user = user;
        console.log(vm.user);
        return vm.user;
    }

    function InsertUser (user) {
        var user = vm.user;
        var insertUser = UserService.insertUser(user);
        insertUser.then(function(response) {
            console.log(response.data);
            vm.users = response.data.content;
            CloseFormNew();
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateUser (user) {
        var user = vm.user;
        var updateUser = UserService.updateUser(user);
        updateUser.then(function(response) {
            console.log(response.data);
            CloseForm();
            GetAllUsers();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function DeleteUser(user) {
        var user = SelectToDelete(user);
        var deleteUser = UserService.deleteUser(user);
        deleteUser.then(function(response) {
            vm.users = response.data.content;
            CloseWarning();
            GetAllTeams();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }
})