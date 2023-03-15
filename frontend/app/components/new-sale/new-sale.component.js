function NewSaleController(SaleService, CustomerService,ProductService, $location) {
    var $ctrl = this;

    $ctrl.insertNewSale = () => {
        
        SaleService.insertSale($ctrl.sale).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageSales();
        }).catch((error) => {
            console.log(error.status)
        }).finally(() => {
            $ctrl.returnToPageSales();
        })
    }

    $ctrl.getCustomers = () => {
        CustomerService.getCustomers().then((response) => {
            $ctrl.customers = response.data;
            console.log($ctrl.customers)
        })
    }

    $ctrl.getProducts = () => {
        ProductService.getProducts().then((response) => {
            $ctrl.products = response.data;
            console.log($ctrl.products);
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getCustomers();
        $ctrl.getProducts();
    }

    $ctrl.returnToPageSales = () => {
        $location.path("/admin/customers")
    }
}

app.component('newSale', {
    templateUrl:'components/new-sale/new-sale.component.html',
    controller: NewSaleController,
})