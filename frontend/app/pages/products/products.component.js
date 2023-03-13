function ProductsController(ProductService) {
    var $ctrl = this;

    $ctrl.getProducts = () => {
      ProductService.getProducts().then((response) => {
        console.log(response.data);
        $ctrl.products = response.data;
      })
    }

    $ctrl.$onInit = () => {
      $ctrl.getProducts();
    }
  }
  app.component("products", {
    templateUrl: "pages/products/products.component.html",
    controller: ProductsController
  })