function ProductsController(ProductService, toaster) {
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
      $ctrl.popSuccess();
    }).catch((error) => {
      $ctrl.popError();
    })
  }

  $ctrl.popSuccess = function () {
    toaster.pop({ type: 'warning', body: 'Produto deletado com sucesso', toasterId: 1 });
  }

  $ctrl.popError = function () {
    toaster.pop({ type: 'error', body: 'Erro ao deletar Produto', toasterId: 2 });
  }
}
app.component("products", {
  templateUrl: "pages/products/products.component.html",
  controller: ProductsController
})