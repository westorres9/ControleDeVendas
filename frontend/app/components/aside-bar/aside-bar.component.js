function AsideBarComponentController(AuthService) {
    var $ctrl = this
    
    $ctrl.Logout = () => {
        AuthService.removeToken();
        window.location.href = 'index.html#/';
    }

    $ctrl.loggedUser = '';

    $ctrl.GetLoggedUser = () => {
        const username = AuthService.getUsername();
        const authority = AuthService.getAuthority();
        const role = authority[0].authority;
        $ctrl.loggedUser = {name: username, authority: role}
    }


    $ctrl.$onInit = () => {
        $ctrl.GetLoggedUser();
    }


}

app.component('asideBar', {
    templateUrl: 'components/aside-bar/aside-bar.component.html',
    controller: AsideBarComponentController
})
