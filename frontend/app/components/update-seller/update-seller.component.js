function UpdateSellerComponentController(SellerService, $routeParams, $location, toaster) {
  var $ctrl = this;

  $ctrl.updateSeller = () => {
    SellerService.updateSeller($ctrl.seller).then((response) => {
      console.log(response.data);
      $ctrl.popSuccess();
    }).catch((error) => {
      console.log(error);
      $ctrl.popError();
    })
  }

  $ctrl.getSellerById = (id) => {
    SellerService.getSellerById(id).then((response) => {
      console.log(response.data);
      $ctrl.seller = response.data;
    })
  }

  $ctrl.$onInit = () => {
    $ctrl.getSellerById($routeParams.id)
  }

  $ctrl.returnToPageSellers = () => {
    $location.path("/admin/sellers")
  }

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'note', body: 'Vendedor atualizado com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao atualizar Vendedor', toasterId: 2 });
  }
}

app.component("updateSeller", {
  templateUrl: "components/update-seller/update-seller.component.html",
  controller: UpdateSellerComponentController
});
