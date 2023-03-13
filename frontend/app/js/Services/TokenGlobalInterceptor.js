app.factory('tokenGlobalInterceptor', Interceptor);
Interceptor.inject = ['$q'];

function Interceptor ($q, AuthService) {
    return {
        request : (config) => {
            const token = AuthService.getToken();
        if(token === null) {
            return config;
        }
        else {
            config.headers['Authorization'] = 'Bearer ' + token;
            return config;
        }},
        responseError: (error) => {
            if(error.status === 401  || error.status === 403) {
            }
            return $q.reject(error);
        }
    }
}

app.config(function($httpProvider) {
    $httpProvider.interceptors.push('tokenGlobalInterceptor');
})