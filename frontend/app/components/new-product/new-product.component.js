function NewProductComponentController(ProductService,CategoryService, $location) {
    
    var $ctrl = this;
    $ctrl.product = {};
    $ctrl.categories = [];
    $ctrl.category = {};
    $ctrl.product.categories = [];

    $ctrl.insertProduct = () => {
        $ctrl.product.categories.push($ctrl.category);
        ProductService.insertProduct($ctrl.product).then((response) => {
            $ctrl.returnToPageProducts();
        }).catch((error) => {
            console.log(error)
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
}

app.component('newProduct', {
    templateUrl: 'components/new-product/new-product.component.html',
    controller: NewProductComponentController
})