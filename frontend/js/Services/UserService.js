vendasApp.service('UserService', function ($http) {
    var url = 'http://localhost:8080/users';

    this.getUsers = function () {
        return $http.get(url)
    }

    this.insert = function (user) {
        var request = $http(
            {
                method: 'post',
                url: url,
                data: user
            }
        )
        return request;
    }

    this.update = function(user) {
        var request = $http(
            {
                method: 'put',
                url: url + `/${user.id}`,
                data: user
            }
        )
        return request;
    }

    this.delete = function(user) {
        var request = $http(
            {
                method: 'delete',
                url: url + `/${user.id}`,
                data: user
            }
        )
        return request;
    }


});
