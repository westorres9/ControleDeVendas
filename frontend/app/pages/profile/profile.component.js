function ProfileController(AuthService, SellerService, ManagerService, UserService, ReportService, UploadService) {
    var $ctrl = this;
    $ctrl.user = {};
    $ctrl.confirmpassword = "";
    $ctrl.switchImage = false;
    $ctrl.showUpdateNameInput = false;
    $ctrl.showUpdateEmailInput = false;
    var imageUpdated = "";
    $ctrl.novoNome = "";
    var novoEmail = "";

    $ctrl.$onInit = () => {
        $ctrl.GetLoggedUser();
    }


    $ctrl.GetLoggedUser = () => {
        const userId = AuthService.getUserId();
        const username = AuthService.getUsername();
        const authority = AuthService.getAuthority();
        const role = authority[0].authority;
        $ctrl.loggedUser = { id: userId, name: username, authority: role }
        console.log($ctrl.loggedUser)

        if ($ctrl.loggedUser.authority == 'ROLE_SELLER') {
            SellerService.getSellerById(userId).then((response) => {
                console.log(response.data);
                $ctrl.user = response.data;
            }).catch((error) => {
                console.log(error)
            })
        }
        else if ($ctrl.loggedUser.authority == 'ROLE_MANAGER') {
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

    $ctrl.updateUserName = () => {
        $ctrl.user.name = $ctrl.newName;
        UserService.updateUserName($ctrl.user).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    $ctrl.updateEmail = () => {
        $ctrl.user.email = $ctrl.newEmail;
        UserService.updateUserEmail($ctrl.user).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    $ctrl.updatePassword = () => {
        $ctrl.user.password = $ctrl.newpassword;
        UserService.updateUserPassword($ctrl.user).then((response) => {
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }

    $ctrl.selectFile = (file) => {
        $ctrl.file = file;
        return $ctrl.file;
    }

    $ctrl.uploadFile = () => {
        var file = $ctrl.selectFile($ctrl.file);
        var formdata = new FormData();
        formdata.append('file', file);
        UserService.updateUserImage($ctrl.user, formdata).then((response) => {
            console.log(response.data, "upload realizado com sucesso");
            $ctrl.user.imgUrl = response.data.pathFile;
            console.log($ctrl.user.imgUrl);
        })
            .catch((error) => {
                console.log(error.status, "erro ao fazer upload");
            })
    }

    $ctrl.updateImage = () => {
        $ctrl.switchImage = !$ctrl.switchImage
    }

    $ctrl.editName = () => {
        $ctrl.showUpdateNameInput = !$ctrl.showUpdateNameInput;
    }

    $ctrl.editEmail = () => {
        $ctrl.showUpdateEmailInput = !$ctrl.showUpdateEmailInput;
    }
}

app.component("profile", {
    templateUrl: "pages/profile/profile.component.html",
    controller: ProfileController
});