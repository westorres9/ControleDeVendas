function UpdateManagerComponentController(ManagerService,$routeParams, toaster) {
    var $ctrl = this;
    $ctrl.manager = {}

    $ctrl.getManagerById = (id) => {
        ManagerService.getManagerById(id).then((response) => {
            console.log(response.data);
            $ctrl.manager = response.data;
        }).catch((error) => {
            console.log(error);
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getManagerById($routeParams.id);
    }

}

app.component("updateManager", {
    templateUrl: "components/update-manager/update-manager.component.html",
    controller: UpdateManagerComponentController
});