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
})