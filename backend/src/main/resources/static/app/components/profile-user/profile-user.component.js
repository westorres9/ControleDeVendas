function ProfileUserComponentController(AuthService,UserService, $scope) {
    var $ctrl = this;
    $ctrl.user = {}

    $ctrl.GetLoggedUser = () => {
        const userId = AuthService.getUserId();
        console.log(userId);
        UserService.getUserById(userId).then((response) => {
            $ctrl.user = response.data;
            console.log($ctrl.user)
        }
        )
    }

    $ctrl.$onInit = () => {
        $ctrl.GetLoggedUser();
    }

    $scope.$on('updateUserData', function () {
        console.log('evento recebido')
        $ctrl.GetLoggedUser();
    });
}

app.component('profileUser', {
    templateUrl: 'components/profile-user/profile-user.component.html',
    controller: ProfileUserComponentController,
})