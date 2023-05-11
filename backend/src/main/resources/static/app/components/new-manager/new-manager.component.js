function NewManagerComponentController(ManagerService, $location, toaster) {
    var $ctrl = this;
  
    $ctrl.insertManager = () => {
      ManagerService.insertManager($ctrl.manager).then((response) => {
        console.log(response.data);
        $ctrl.popSuccess(); 
      }).catch((error) => {
        console.log(error);
        $ctrl.popError();
      })
    }
  
    $ctrl.popSuccess = function () {
      toaster.pop({ type: 'success', body: 'Vendedor cadastrado com sucesso', toasterId: 1 , });
  }
        
  $ctrl.popError = function () {
      toaster.pop({ type: 'error', body: 'Erro ao cadastrar vendedor', toasterId: 2 });
  }
  }
  
  app.component("newManager", {
    templateUrl: "components/new-manager/new-manager.component.html",
    controller: NewManagerComponentController
  });
  