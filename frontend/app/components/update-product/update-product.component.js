function UpdateProductComponentController(ProductService, CategoryService, $routeParams) {
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
        window.location.href = "index.html#/admin/products"
    }

    $ctrl.$onInit = () => {
        $ctrl.getProductById($routeParams.id);
    }
}

app.component("updateProduct", {
    templateUrl: "components/update-product/update-product.component.html",
    controller: UpdateProductComponentController
});