vendasApp.controller('loginController', function ($http, $httpParamSerializerJQLike,$window, AuthService) {
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
			.then(function (response, $location) {
				const loginResponse = response.data;
				console.log('response', response)
				console.log(AuthService.setToken(response.data));
				console.log(AuthService.setAuthority(response.data.Authority[0]));
				AuthService.setToken(loginResponse);
				console.log('log2', AuthService.getToken());
				console.log('log3', AuthService.getAuthority());
				console.log('log4', AuthService.getUserName());
				var USER_ROLE = AuthService.getAuthority();
				if(USER_ROLE.authority == "ROLE_ADMIN") {
					window.location.href = '/index.html#/home';
				}
				else if (USER_ROLE.authority == "ROLE_MANAGER") {
					window.location.href = '/index.html#/home';
				}
				else if (USER_ROLE.authority == "ROLE_SELLER") {
					window.location.href = '/index.html#/home';
				}
				else if (USER_ROLE.authority == null || USER_ROLE.authority == undefined) {
					window.location.href = '/index.html#/login';
				}
				else (window.location.href = '/index.html#/login')
			}).catch(function (response) {
				console.log("Falha" + response.data);
			});		
	}
})