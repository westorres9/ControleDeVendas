function ProfileController(AuthService, SellerService, ManagerService, UserService) {
    var $ctrl = this;
    $ctrl.user = {};
    $ctrl.confirmpassword = "";

    $ctrl.GetLoggedUser = () => {
        const userId = AuthService.getUserId();
        const username = AuthService.getUsername();
        const authority = AuthService.getAuthority();
        const role = authority[0].authority;
        $ctrl.loggedUser = {id: userId, name: username, authority: role}
        console.log($ctrl.loggedUser)

        if($ctrl.loggedUser.authority == 'ROLE_SELLER') {
            SellerService.getSellerById(userId).then((response) => {
                console.log(response.data);
                $ctrl.user = response.data;
            }).catch((error) => {
                console.log(error)
            })
        }
        else if($ctrl.loggedUser.authority == 'ROLE_MANAGER') {
            ManagerService.getManagerById(userId).then((response) => {
                console.log(response.data);
                $ctrl.user = response.data;
            }).catch((error) => {
                console.log(error)
            })
        }
        else {
            UserService.getUserById(userId).then((response) => {
                console.log(response.data);
                $ctrl.user = response.data;
            })
        }
    }

    $ctrl.updateUser = () => {
        UserService.updateUser($ctrl.user).then((response) => {
            console.log(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.GetLoggedUser();
    }
}

app.component("profile", {
    templateUrl: "pages/profile/profile.component.html",
    controller: ProfileController
  });