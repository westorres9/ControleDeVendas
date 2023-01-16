myapp.controller('loginCtrl', function($http, $httpParamSerializerJQLike, AuthService, $scope) {
    vm = this;
    vm.user = {'grant_type' : 'password' };
    vm.Authenticate = Authenticate;
    var title = 'Login'
    vm.title = title;
    vm.Logout = Logout;
    vm.Login = Login;
    vm.setTitle = setTitle;

    vm.isAuthenticated = isAuthenticated;

    function isAuthenticated() {
        const token = AuthService.getToken();
        if(token == undefined || token == null) {
            return false
        }
        return true
    }

    isAuthenticated();
    console.log('isAutenticated', isAuthenticated());



    function setTitle() {
        isAuthenticated() ? vm.title = 'Logout' : vm.title = 'Login';
    }


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
            isAuthenticated();
            if(token !== undefined || token !== null) {
                vm.Login();
                setTitle();
            } 
        })
        .catch(function(error) {
            console.log(error.data);
            window.location.href = 'index.html#/login'
            vm.title = 'Login'
            vm.setTitle();
        }
        );
    }

    function Logout() {
        AuthService.removeToken();
        window.location.href = 'index.html#/login'
        vm.title = 'Login'
    }

    function Login() {
        window.location.href = 'index.html#/admin'
        vm.title = 'Logout'
    }
})