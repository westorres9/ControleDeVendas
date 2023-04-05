function UpdateProductComponentController(ProductService,CategoryService, $routeParams, $location, toaster) {
    var $ctrl = this;
    $ctrl.product = {};
    $ctrl.categories = [];
    $ctrl.category = {};
    $ctrl.product.categories = [];
    $ctrl.showUpdateNameInput = false;

    $ctrl.updateProduct = () => {
        $ctrl.product.categories.pop();    
        $ctrl.product.categories.push($ctrl.category);
            ProductService.updateProduct($ctrl.product).then((response) => {
                console.log(response.data);
                $ctrl.popSuccess();
            }).catch((error) => {
                console.log(error);
                $ctrl.popError();
            }) 
    }

    $ctrl.getProductById = (id) => {
        ProductService.getProductsById(id).then((response) => {
            console.log(response.data);
            $ctrl.product = response.data;
            $ctrl.category = $ctrl.product.categories[0];
            console.log($ctrl.category);
        })
    }

    $ctrl.getCategories = () => {
        CategoryService.getCategories().then((response) => {
          $ctrl.categories = response.data;
        })
    }

    $ctrl.returnToPageProducts = () => {
        $location.path("/admin/products")
    }

    $ctrl.$onInit = () => {
        $ctrl.getProductById($routeParams.id);
        $ctrl.getCategories();
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'note', body: 'Produto atualizado com sucesso', toasterId: 1 });
    }

    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao atualizar Produto', toasterId: 2 });
    }

    $ctrl.editName = () => {
        $ctrl.showUpdateNameInput = !$ctrl.showUpdateNameInput;
      }
}

app.component("updateProduct", {
    templateUrl: "components/update-product/update-product.component.html",
    controller: UpdateProductComponentController
});