myApp.controller('loginCtrl', function($http, $httpParamSerializerJQLike, AuthService) {
    vm = this;
    vm.title = 'loginCtrl'
    vm.user = {'grant_type': 'password'};
    vm.authenticate = authenticate;

    function authenticate() {
        
        let CLIENT_ID = "dsvendas";
        let CLIENT_SECRET = "dsvendas123";
        let BASE_URL = "http://localhost:8080";

        $http.post(`${BASE_URL}/oauth/token`, $httpParamSerializerJQLike(vm.user),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            }
        })
        .then(function(response) {
            let LoginResponse = response.data;
            console.log(LoginResponse);
            AuthService.setToken(LoginResponse.access_token);
            AuthService.setAuthority(LoginResponse.Authority[0])
            AuthService.setUserName(LoginResponse.userName)
            console.log(AuthService.getUserName());
            console.log(AuthService.getAuthority())
            console.log(AuthService.getToken());
            let token = AuthService.getToken();
            if(token !== undefined || null) {
                window.location.href = 'index.html#/admin'
            }
        })
        .catch(function(error) {
            console.log(error.data);
        });
    };
});