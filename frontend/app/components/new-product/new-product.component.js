function NewProductComponentController(ProductService,CategoryService, $location) {
    var $ctrl = this;
    $ctrl.category = "";

    $ctrl.insertProduct = () => {
        ProductService.insertProduct($ctrl.product).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageProducts();
        }).catch((error) => {
            console.log(error)
        })
    }

    $ctrl.getCategories = () => {
        CategoryService.getCategories().then((response) => {
          console.log(response.data)
          $ctrl.categories = response.data;
        })
    }

    $ctrl.returnToPageProducts = () => {
        $location.path("/admin/products")
    }

    $ctrl.addCategory = () => {
        var product = $ctrl.product.categories[0].push($ctrl.category);
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