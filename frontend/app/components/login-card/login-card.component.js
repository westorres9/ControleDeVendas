
function LoginCardComponentController($http, $httpParamSerializerJQLike, AuthService) {
    var $ctrl = this;
    $ctrl.user = { 'grant_type' : 'password' }
    $ctrl.Authenticate = Authenticate;
  
    function Authenticate() {
  
      const CLIENT_ID = 'dsvendas';
      const CLIENT_SECRET = 'dsvendas123';
      const BASE_URL = 'http://localhost:8080';
  
      $http.post('http://localhost:8080/oauth/token', $httpParamSerializerJQLike($ctrl.user), 
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
        }
      })
      .then((response) => {
        const loginResponse = response.data;
        console.log(loginResponse);
        AuthService.setToken(loginResponse.access_token);
        const token = AuthService.getToken();
        AuthService.setUsername(loginResponse.userName);
        const username = AuthService.getUsername();
        AuthService.setProfileImage(loginResponse.profileImage);
        const profileImage = AuthService.getProfileImage();
        console.log(profileImage);
        console.log(username);
        console.log('token', token);
        if(token !== null) {
          window.location.href = 'index.html#/admin';
        }
      })
    }
  
  }

app.component('loginCard', {
    templateUrl:'components/login-card/login-card.component.html',
    controller: LoginCardComponentController,
})