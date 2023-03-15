function NewSellerComponentController(SellerService, $location) {
  var $ctrl = this;

  $ctrl.insertSeller = () => {
    SellerService.insertSeller($ctrl.seller).then((response) => {
      console.log(response.data);
      $ctrl.returnToPageSellers();
    }).catch((error) => {
      console.log(error);
    })
  }

  $ctrl.returnToPageSellers = () => {
    $location.path("/admin/sellers")
  } 
}

app.component("newSeller", {
  templateUrl: "components/new-seller/new-seller.component.html",
  controller: NewSellerComponentController
});
