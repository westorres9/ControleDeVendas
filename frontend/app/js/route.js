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
        template: '<admin></admin>'
    })
    .when('/admin/sales', {
        template: '<sales></sales>'
    })
    .when('/admin/sellers', {
        template: '<sellers></sellers>'
    })
    .when('/admin/teams', {
        template: '<teams></teams>'
    })
}])

