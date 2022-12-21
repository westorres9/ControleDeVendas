myApp.factory('tokenGlobalInterceptor', Interceptor);
Interceptor.inject = ['$q'];
function Interceptor($q, AuthService) {
    return {
        request: function(config) {
            const token = AuthService.getToken();
            if(token === null) {
                console.log(token);
                return config;
            }
            else {
                config.headers['Authorization'] = 'Bearer ' + token;
                return config;
            }},
        responseError: function(error) {
            if(error.status === 401  || error.status === 403) {
            }
            return $q.reject(error);
        }
    }
};

myApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenGlobalInterceptor');
})