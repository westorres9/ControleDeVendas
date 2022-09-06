vendasApp.config(function($routeProvider) {
    $routeProvider
    .when('/', {
        templateUrl: 'pages/home/home.html',
        controller: 'homeController',
        controllerAs: 'vm'
    })
    .when('/home', {
        templateUrl: 'pages/home/home.html',
        controller: 'homeController',
        controllerAs: 'vm'
    })
    .when('/sales', {
        templateUrl: 'pages/sales/sales.html',
        controller: 'salesController',
        controllerAs: 'vm'
    })
    .when('/teams', {
        templateUrl: 'pages/teams/teams.html',
        controller: 'teamsController',
        controllerAs: 'vm'
    })
    .when('/users', {
        templateUrl: 'pages/users/users.html',
        controller: 'UserController',
        controllerAs: 'vm'
    })
    .when('/login', {
        templateUrl: 'pages/login/login.html',
        controller: 'LoginController',
        controllerAs: 'vm'
    })
    .otherwise('/login');
})