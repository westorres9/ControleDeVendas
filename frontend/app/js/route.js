myApp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.html',
            controller: 'adminCtrl',
            controllerAs: 'vm',
            authenticated: true
        })
        .when('/admin/sales', {
            templateUrl: 'views/sales/sales.html',
            controller: 'saleCtrl',
            controllerAs: 'vm',
            authenticated: true
        })
        .when('/admin/teams', {
            templateUrl: 'views/teams/teams.html',
            controller: 'teamCtrl',
            controllerAs: 'vm',
            authenticated: true
        })
        .when('/admin/users', {
            templateUrl: 'views/users/users.html',
            controller: 'userCtrl',
            controllerAs: 'vm',
            authenticated: true
        })
        .otherwise('/login',{
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
            controllerAs: 'vm'
        });
})

myApp.run(["$rootScope", "$location", "AuthService", function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, current, next) {
        console.log(event);
        console.log(current);
        console.log(next);
        if (current.$$route.authenticated) {
            var token = AuthService.getToken();
            var authority = AuthService.getAuthority();
            if(!token) {
                window.localStorage.clear();
                $location.path('/app/index.html#/login')
            }
        }
    })
}])