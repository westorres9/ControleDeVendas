function UpdateProductComponentController(ProductService, $routeParams, $location) {
    var $ctrl = this;

    $ctrl.updateProduct = () => {
        ProductService.updateProduct($ctrl.product).then((response) => {
            console.log(response.data);
            window.location = "index.html#/admin/products"
        }).catch((error) => {
            console.log(error)
        });
    }

    $ctrl.getProductById = (id) => {
        ProductService.getProductsById(id).then((response) => {
            console.log(response.data);
            $ctrl.product = response.data;  
        })
    }

    $ctrl.returnToPageProducts = () => {
        $location.path("/admin/products")
    }

    $ctrl.$onInit = () => {
        $ctrl.getProductById($routeParams.id);
    }
}

app.component("updateProduct", {
    templateUrl: "components/update-product/update-product.component.html",
    controller: UpdateProductComponentController
});