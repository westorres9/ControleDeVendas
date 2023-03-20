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
    .when('/admin/dashboard', {
        template: '<dashboard></dashboard>',
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
        template: '<update-team></update-team>',
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
    .when('/admin/categories/new', {
        template: '<new-category></new-category>',
        authenticated: true
    })
    .when('/admin/categories/:id', {
        template: '<update-category></update-category>',
        authenticated: true
    })
    .when('/admin/products', {
        template: '<products></products>',
        authenticated: true
    })
    .when('/admin/products/new', {
        template: '<new-product></new-product>',
        authenticated: true
    })
    .when('/admin/products/:id', {
        template: '<update-product></update-product>',
        authenticated: true
    })
    .when('/admin/customers', {
        template: '<customers></customers>',
        authenticated: true
    })
    .when('/admin/customers/new', {
        template: '<new-customer></new-customer>',
        authenticated: true
    })
    .when('/admin/customers/:id', {
        template: '<update-customer></update-customer>',
        authenticated: true
    })
    .when('/admin/sellers/new', {
        template: '<new-seller></new-seller>',
        authenticated: true
    })
    .when('/admin/sellers/:id', {
        template: '<update-seller></update-seller>',
        authenticated: true
    })
    .when('/admin/managers', {
        template: '<managers></managers>',
        authenticated: true
    })
    .when('/admin/managers/new', {
        template: '<new-manager></new-manager>',
        authenticated: true
    })
    .when('/admin/reports', {
        template: '<reports></reports>',
        authenticated: true
    })
}])

app.run(["$rootScope", "$location", "AuthService", function($rootScope, $location, AuthService) {
    $rootScope.$on('$routeChangeStart', function(event, current, next) {

        if(current.$$route.authenticated) {
            var token = AuthService.getToken();
            var auth = AuthService.getAuthority();
            var authority = auth[0].authority;
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

