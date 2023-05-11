function ManagerController(ManagerService, toaster) {
    var $ctrl = this;
    $ctrl.managers = []

    $ctrl.getManagers = () => {
        ManagerService.getManagers().then((response) => {
            console.log(response.data)
            $ctrl.managers = response.data;
        })
    }

    $ctrl.selectToDelete = (manager) => {
        $ctrl.showWarning();
        $ctrl.manager = manager;
        console.log($ctrl.manager);
        return $ctrl.manager;
    }

    $ctrl.deleteManager = (manager) => {
        ManagerService.deleteManagerById(manager).then((response) => {
            console.log(response.data);
            $ctrl.getManagers();
            $ctrl.closeWarning();
            $ctrl.popSuccess();
        }).catch((error) => {
            console.log(error);
            $ctrl.popError();
        })
    }

    $ctrl.showWarning = () => {
        $ctrl.warningVisible = true;
    }

    $ctrl.closeWarning = () => {
        $ctrl.warningVisible = false;
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'warning', body: 'Manager deletado com sucesso', toasterId: 1 });
    }
          
    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao deletar Manager', toasterId: 2 });
    }

    $ctrl.$onInit = () => {
        $ctrl.getManagers();
    }

}

app.component("managers", {
    templateUrl: "pages/managers/managers.component.html",
    controller: ManagerController
})