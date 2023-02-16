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
        console.log(role)
        $ctrl.loggedUser = {name: username, authority: role}
        console.log($ctrl.loggedUser);
    }


    $ctrl.$onInit = () => {
        $ctrl.GetLoggedUser();
    }


}

app.component('asideBar', {
    templateUrl: 'components/aside-bar/aside-bar.component.html',
    controller: AsideBarComponentController
})
