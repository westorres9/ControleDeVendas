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

    $ctrl.selectToDelete = (product) => {
      $ctrl.showWarning();
      $ctrl.product = product
      console.log($ctrl.product);
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
        console.log(response.data);
        $ctrl.getProducts();
        $ctrl.closeWarning();
      }).catch((error) => {
        console.log(error.status)
      })
    }
  }
  app.component("products", {
    templateUrl: "pages/products/products.component.html",
    controller: ProductsController
  })