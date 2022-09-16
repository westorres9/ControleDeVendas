vendasApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm',
    })
    .when('/home', {
        templateUrl: 'pages/home/home.html',
        controller: 'homeController',
        controllerAs: 'vm',
        authenticated: true
    })
    .when('/sales', {
        templateUrl: 'pages/sales/sales.html',
        controller: 'salesController',
        controllerAs: 'vm',
        authenticated: true
    })
    .when('/teams', {
        templateUrl: 'pages/teams/teams.html',
        controller: 'teamsController',
        controllerAs: 'vm',
        authenticated: true,
    })
    .when('/users', {
        templateUrl: 'pages/users/users.html',
        controller: 'UserController',
        controllerAs: 'vm',
        authenticated: true,
    })
    .when('/login', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    })
    .otherwise('/login');
})


vendasApp.run(["$rootScope", "$location", "AuthService", function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, current, next) {
        console.log(event);
        console.log(current);
        console.log(next);
        if (current.$$route.authenticated) {
            var token = AuthService.getToken();
            var authority = AuthService.getAuthority();
            if (!token) {
                $location.path("/login")
                
            }
            
        }
        
    })
    
}])