vendasApp.controller("LoginController", function ($http, $httpParamSerializerJQLike , AuthService) {
	var vm = this;
	vm.user = { 'grant_type': 'password' };
	vm.authenticate = authenticate;
	
	
	function authenticate () {
		var CLIENT_ID = 'dsvendas'
		var CLIENT_SECRET = 'dsvendas123'

		$http.post("http://localhost:8080/oauth/token", $httpParamSerializerJQLike(vm.user),
			{
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					'Authorization': 'Basic ' + window.btoa(CLIENT_ID + ':' + CLIENT_SECRET)
				}
			})
			.then(function (response, $window) {
				const loginResponse = response.data;
				console.log('response', response)
				console.log(AuthService.setToken(response.data));
				console.log(AuthService.setAuthority(response.data.Authority[0]));
				AuthService.setToken(loginResponse);
				console.log('log2', AuthService.getToken());
				console.log('log3', AuthService.getAuthority());
			}).catch(function (response) {
				console.log("Falha" + response.data);
			});
	}
})