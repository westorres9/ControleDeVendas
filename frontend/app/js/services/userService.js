vendasApp.service('UserService', function($http, $routeParams) {
    let BASE_URL = "http://localhost:8080";

    this.getAllUsers = function() {
        return $http.get(`${BASE_URL}/users`);
    }

    this.insertUser = function(user) {

        var request = $http(
            {
                method: 'post',
                url: `${BASE_URL}/users`,
                data: user
            }
        )
        return request;
    }

    this.updateUser = function(user) {

        var request = $http(
            {
                method: 'put',
                url: `${BASE_URL}/users/${user.id}`,
                data: user
            }
        )
        return request;
    }

    this.deleteUser = function (user) {
        var request = $http.delete(`${BASE_URL}/users/${user.id}`);
        return request;
    }

})


