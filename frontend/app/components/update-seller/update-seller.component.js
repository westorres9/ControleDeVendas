function UpdateSellerComponentController(SellerService, $routeParams) {
  var $ctrl = this;

  $ctrl.updateSeller = () => {
    SellerService.updateSeller($ctrl.seller).then((response) => {
      console.log(response.data);
      $ctrl.returnToPageSellers();
    }).catch((error) => {
      console.log(error);
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
    $window.location.href = "index.html#/admin/sellers"
  } 
}

app.component("updateSeller", {
  templateUrl: "components/update-seller/update-seller.component.html",
  controller: UpdateSellerComponentController
});
