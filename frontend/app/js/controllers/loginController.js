vendasApp.controller('loginController', function($http, $httpParamSerializerJQLike, AuthService) {
    var vm = this;
    vm.title = 'loginController';
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