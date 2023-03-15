function ProductsController(ProductService) {
    var $ctrl = this;

    $ctrl.getProducts = () => {
      ProductService.getProducts().then((response) => {
        $ctrl.products = response.data;
      })
    }

    $ctrl.$onInit = () => {
      $ctrl.getProducts();
    }

    $ctrl.selectToDelete = (product) => {
      $ctrl.showWarning();
      $ctrl.product = product
      return $ctrl.product;
    }

    $ctrl.showWarning = () => {
      $ctrl.warningVisible = true;
    }

    $ctrl.closeWarning = () => {
      $ctrl.warningVisible = false;
    }

    $ctrl.deleteProduct = (product) => {
      ProductService.deleteProductById(product).then((response) => {
        $ctrl.getProducts();
        $ctrl.closeWarning();
      })
    }
  }
  app.component("products", {
    templateUrl: "pages/products/products.component.html",
    controller: ProductsController
  })