function AsideBarComponentController(AuthService) {
    var $ctrl = this
    $ctrl.loggedUser = '';

    $ctrl.Logout = () => {
        AuthService.removeToken();
        window.location.href = 'index.html#/';
    }
}

app.component('asideBar', {
    templateUrl: 'components/aside-bar/aside-bar.component.html',
    controller: AsideBarComponentController
})
