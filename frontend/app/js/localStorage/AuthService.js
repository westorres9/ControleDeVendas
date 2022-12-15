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
        },
        setAuthority: function(token) {
            window.localStorage.setItem('Authority', angular.toJson(token));
            console.log('AuthService.setAuthority', token)
        },
        getAuthority: function () {
            let token = window.localStorage.getItem('Authority');
            return angular.fromJson(token)
        },
        hasAnyRoles: function (roles) {
            if (roles.length === 0) {
              return true;
            }
        },
        setUserName: function(user) {
            window.localStorage.setItem('userName', angular.toJson(user));
            console.log('AuthService.setUserName', user)
        },
        getUserName: function () {
            let user = window.localStorage.getItem('userName');
            return angular.fromJson(user)
        },
    }
}
