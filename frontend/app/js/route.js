app.config([ '$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when('/', {
        template: '<login></login>'
    })
    .when('/home', {
        template: '<login></login>'
    })
    .when('/admin', {
        template: '<admin></admin>',
        authenticated: true
    })
    .when('/admin/sales', {
        template: '<sales></sales>',
        authenticated: true
    })
    .when('/admin/sales/new', {
        template: '<new-sale></new-sale>',
        authenticated: true
    })
    .when('/admin/sales/:id', {
        template: '<update-sale sale="sale"></update-sale>',
        authenticated: true
    })
    .when('/admin/sellers', {
        template: '<sellers></sellers>',
        authenticated: true
    })
    .when('/admin/teams', {
        template: '<teams></teams>',
        authenticated: true
    })
    .when('/admin/teams/new', {
        template: '<new-team></new-team>',
        authenticated: true
    })
    .when('/admin/teams/:id', {
        template: '<team-details></team-details>',
        authenticated: true,
    })
    
}])

app.run(["$rootScope", "$location", "AuthService", function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, current, next) {

        if(current.$$route.authenticated) {
            var token = AuthService.getToken();
            var authority = AuthService.getAuthority();
            if(!token) {
                window.localStorage.clear();
                AuthService.removeToken();
                window.location.href = 'index.html#/';
            }
        }
    })
}])

