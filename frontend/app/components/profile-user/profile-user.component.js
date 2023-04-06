function ProfileUserComponentController(AuthService) {
    var $ctrl = this;

    $ctrl.GetLoggedUser = () => {
        const username = AuthService.getUsername();
        const profileImage = AuthService.getProfileImage();
        $ctrl.loggedUser = {
            'name': username,
            'profileImage': profileImage
        }
    }
    
    $ctrl.$onInit = () => {
        $ctrl.GetLoggedUser();
    }

}

app.component('profileUser', {
    templateUrl:'components/profile-user/profile-user.component.html',
    controller: ProfileUserComponentController,
})