vendasApp.service('UserService', function($http) {
    var url = 'http://localhost:8080/users';

    this.getUsers = function() {
        return $http.get(url)
    }
});