myapp.controller('loginCtrl', function($http, $httpParamSerializerJQLike, AuthService) {
    vm = this;
    vm.title = 'loginCtrl';
    vm.user = {'grant_type' : 'password' };
    vm.Authenticate = Authenticate;

    function Authenticate() {
        
        const CLIENT_ID = "dsvendas";
        const CLIENT_SECRET = "dsvendas123";
        const BASE_URL = "http://localhost:8080";

        $http.post(`${BASE_URL}/oauth/token`, $httpParamSerializerJQLike(vm.user), 
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
            }
        })
        .then((response) => {
            let loginResponse = response.data;
            console.log(loginResponse);
            AuthService.setToken(loginResponse.access_token);
            AuthService.setToken(loginResponse.access_token);
            AuthService.setAuthority(loginResponse.Authority[0]);
            AuthService.setUsername(loginResponse.userName);
            console.log('token', AuthService.getToken());
            console.log('authority',AuthService.getAuthority());
            console.log('username',AuthService.getUsername());
            const token = AuthService.getToken();
            if(token !== undefined || null) {
                window.location.href = 'index.html#/admin'
            }
        })
        .catch(function(error) {
            console.log(error.data);
        });
    }
})