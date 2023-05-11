function NewSellerComponentController(SellerService, $location, toaster) {
  var $ctrl = this;

  $ctrl.insertSeller = () => {
    SellerService.insertSeller($ctrl.seller).then((response) => {
      console.log(response.data);
      $ctrl.popSuccess(); 
    }).catch((error) => {
      console.log(error);
      $ctrl.popError();
    })
  }

  $ctrl.returnToPageSellers = () => {
    $location.path("/admin/sellers")
  } 

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'success', body: 'Vendedor cadastrado com sucesso', toasterId: 1 , });
}
      
$ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao cadastrar vendedor', toasterId: 2 });
}
}

app.component("newSeller", {
  templateUrl: "components/new-seller/new-seller.component.html",
  controller: NewSellerComponentController
});
