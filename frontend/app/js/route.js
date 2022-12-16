vendasApp.config(function ($routeProvider) {

    $routeProvider
        .when('/', {
            templateUrl: 'views/home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
        .when('/home', {
            templateUrl: 'views/home/home.html',
            controller: 'homeController',
            controllerAs: 'vm'
        })
        .when('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
        .when('/admin', {
            templateUrl: 'views/admin/admin.html',
            controller: 'adminController',
            controllerAs: 'vm'
        })
        .when('/admin/sales', {
            templateUrl: 'views/sales/sales.html',
            controller: 'salesController',
            controllerAs: 'vm'
        })
        .when('/admin/teams', {
            templateUrl: 'views/teams/teams.html',
            controller: 'teamsController',
            controllerAs: 'vm'
        })
        .when('/admin/users', {
            templateUrl: 'views/users/users.html',
            controller: 'usersController',
            controllerAs: 'vm'
        })
        .otherwise('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
});