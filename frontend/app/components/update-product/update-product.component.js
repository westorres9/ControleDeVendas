function UpdateProductComponentController(ProductService,CategoryService, $routeParams, $location) {
    var $ctrl = this;
    $ctrl.product = {};
    $ctrl.categories = [];
    $ctrl.category = {};
    $ctrl.product.categories = [];

    $ctrl.updateProduct = () => {
        $ctrl.product.categories.pop();    
        $ctrl.product.categories.push($ctrl.category);
            ProductService.updateProduct($ctrl.product).then((response) => {
                console.log(response.data);
                $location.path("/admin/products")
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
}

app.component("updateProduct", {
    templateUrl: "components/update-product/update-product.component.html",
    controller: UpdateProductComponentController
});