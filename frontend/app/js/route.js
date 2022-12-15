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
        
        .when('/admin/users/:userId', {
            templateUrl: 'views/user-form/userform.html',
            controller: 'usersController',
            controllerAs: 'vm'
        })
        .when('/admin/users/create', {
            templateUrl: 'views/user-form/userform.html',
            controller: 'usersController',
            controllerAs: 'vm'
        })
        .when('/admin/teams/:teamId', {
            templateUrl: 'views/team-form/teamform.html',
            controller: 'teamsController',
            controllerAs: 'vm'
        })
        .when('/admin/teams/create', {
            templateUrl: 'views/team-form/teamform.html',
            controller: 'teamsController',
            controllerAs: 'vm'
        })
        .when(`/admin/sales/:id`, {
            templateUrl: 'views/sale-form/saleform.html',
            controller: 'salesController',
            controllerAs: 'vm'
        })
        .when('/admin/sales/create', {
            templateUrl: 'views/sale-form/saleform.html',
            controller:'salesController',
            controllerAs: 'vm'
        })
        .otherwise('/login', {
            templateUrl: 'views/login/login.html',
            controller: 'loginController',
            controllerAs: 'vm'
        })
});