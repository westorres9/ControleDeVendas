app.config([ '$routeProvider',
function config($routeProvider) {
  $routeProvider
    .when('/', {
        template: '<login></login>'
    })
    .when('/home', {
        template: '<login></login>'
    })
    .when('/recover', {
        template: '<recover></recover>'
    })
    .when('/valid-token', {
        template: '<valid-token></valid-token>'
    })
    .when('/:id/reset-password', {
        template: '<reset-password user="user"></reset-password>'
    })
    .when('/admin', {
        template: '<admin></admin>',
        authenticated: true
    })
    .when('/admin/sales', {
        template: '<sales></sales>',
        authenticated: true,
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
    .when('/admin/teams/:id/new-user', {
        template: '<new-user></new-user>',
        authenticated: true,
    })
    .when('/admin/teams/:id/user/:id', {
        template: '<update-user></update-user>',
        authenticated: true,
    })
    .when('/admin/categories', {
        template: '<categories></categories>',
        authenticated: true
    })
    .when('/admin/products', {
        template: '<products></products>',
        authenticated: true
    })
    .when('/admin/customers', {
        template: '<customers></customers>',
        authenticated: true
    })
    
}])

app.run(["$rootScope", "$location", "AuthService", function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, current, next) {

        if(current.$$route.authenticated) {
            var token = AuthService.getToken();
            var auth = AuthService.getAuthority();
            var authority = auth[0].authority;
            console.log(authority)
            if(!token) {
                window.localStorage.clear();
                AuthService.removeToken();
                window.location.href = 'index.html#/';
            }
            if(!authority) {
                event.preventDefault(); 
            }
        }
    })
}])

