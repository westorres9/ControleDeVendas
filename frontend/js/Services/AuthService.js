vendasApp.factory('AuthService', AuthService);
function AuthService () {
    return {
        setToken: function (token) {
            window.localStorage.setItem('access_token', angular.toJson(token));
            console.log('AuthService.setToken', token);
        },
        getToken: function() {
            let token = window.localStorage.getItem('access_token');
            return angular.fromJson(token);
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
        }
    } 
}