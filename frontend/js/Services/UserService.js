vendasApp.service('UserService', function ($http) {
    var url = 'http://localhost:8080/users';

    this.getUsers = function () {
        return $http.get(url)
    }

    this.insertUser = function (user) {
        var request = $http(
            {
                method: 'post',
                url: url,
                data: user
            }
        )
        return request;
    }
});
