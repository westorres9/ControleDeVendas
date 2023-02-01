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
    .when('/admin/sales/new', {
        template: '<new-sale></new-sale>'
    })
    .when('/admin/sales/:id', {
        template: '<update-sale sale="sale"></update-sale>'
    })
    .when('/admin/sellers', {
        template: '<sellers></sellers>'
    })
    .when('/admin/teams', {
        template: '<teams></teams>'
    })
    .when('/admin/teams/:id', {
        template: '<team-details></team-details>'
    })
}])

