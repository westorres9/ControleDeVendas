function NewProductComponentController(ProductService,CategoryService, $location, toaster) {
    
    var $ctrl = this;
    $ctrl.product = {};
    $ctrl.categories = [];
    $ctrl.category = {};
    $ctrl.product.categories = [];

    $ctrl.insertProduct = () => {
        $ctrl.product.categories.push($ctrl.category);
        ProductService.insertProduct($ctrl.product).then((response) => {
            $ctrl.popSuccess();
        }).catch((error) => {
            console.log(error)
            $ctrl.popError();
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

    $ctrl.addCategory = () => {
        var product = $ctrl.product.categories.push($ctrl.category);
        return product;
    }
    
    $ctrl.$onInit = () => {
        $ctrl.getCategories();
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'success', body: 'Novo Produto cadastrado com sucesso', toasterId: 1 });
    }
          
    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao cadastrar Novo Produto', toasterId: 2 });
    }
}

app.component('newProduct', {
    templateUrl: 'components/new-product/new-product.component.html',
    controller: NewProductComponentController
})