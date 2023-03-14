function NewProductComponentController(ProductService,CategoryService, $window) {
    var $ctrl = this;

    $ctrl.insertProduct = () => {
        ProductService.insertProduct($ctrl.product).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageProducts();
        }).catch((error) => {
            console.log(error);
        })
    }

    $ctrl.getCategories = () => {
        CategoryService.getCategories().then((response) => {
          console.log(response.data)
          $ctrl.categories = response.data;
        })
    }

    $ctrl.returnToPageProducts = () => {
        $window.location.href = "index.html#/admin/products"
    }

    $ctrl.selectCategory = (category) => {
        $ctrl.category = category
        console.log($ctrl.category);
        return $ctrl.category;
    }

    $ctrl.$onInit = () => {
        $ctrl.getCategories();
    }
}

app.component('newProduct', {
    templateUrl: 'components/new-product/new-product.component.html',
    controller: NewProductComponentController
})