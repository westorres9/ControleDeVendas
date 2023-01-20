myapp.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl',
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
            controllerAs: 'vm'
        })
        .when('/teste', {
            templateUrl: 'views/teste/teste.html',
            controller: 'testeCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/sales', {
            templateUrl: 'views/sales/sales.html',
            controller: 'saleCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/teams', {
            templateUrl: 'views/teams/teams.html',
            controller: 'teamCtrl',
            controllerAs: 'vm'
        })
        .when('/admin/users', {
            templateUrl: 'views/users/users.html',
            controller: 'userCtrl',
            controllerAs: 'vm'
        })
        
        
})