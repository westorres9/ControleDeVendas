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

    $ctrl.updateManager = () => {
        ManagerService.updateManager($ctrl.manager).then((response) => {
            console.log(response.data);
            $ctrl.popSuccess();
        }).catch((error) => {
            console.log(error);
            $ctrl.popError();
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getManagerById($routeParams.id);
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'note', body: 'Gestor atualizado com sucesso', toasterId: 1 });
    }

    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao atualizar Gestor', toasterId: 2 });
    }

}

app.component("updateManager", {
    templateUrl: "components/update-manager/update-manager.component.html",
    controller: UpdateManagerComponentController
});