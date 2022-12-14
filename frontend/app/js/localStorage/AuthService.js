vendasApp.factory('AuthService', AuthService);

function AuthService() {
    return {
        setToken: function (token) {
            window.localStorage.setItem('access_token', angular.toJson(token));
            console.log('AuthService: setToken', token);
        },
        getToken: function () {
            let token = window.localStorage.getItem('access_token');
            return angular.fromJson(token);
        },
        removeToken: function () {
            window.localStorage.removeItem('access_token');
            window.localStorage.removeItem('Authority');
            window.localStorage.clear();
            window.location.href = 'index.html#/login';
        }
    }
}