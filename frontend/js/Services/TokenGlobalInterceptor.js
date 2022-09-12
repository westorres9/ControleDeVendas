vendasApp.factory('tokenGlobalInterceptor', Interceptor);
Interceptor.inject = ['$q'];
function Interceptor($q, AuthService) {
    return {
        request: function(config) {
            const token = AuthService.getToken();
            if(token === null) {
                console.log(token);
                console.log(config);
                return config;
            }
            else {
                config.headers['Authorization'] = 'Bearer ' + token.access_token;
                console.log(config);
                return config;
            }},
        responseError: function(error) {
            if(error.status === 401  || error.status === 403) {
                console.log(config);
            }
            return $q.reject(error);
        }
    }
};

vendasApp.config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenGlobalInterceptor');
})