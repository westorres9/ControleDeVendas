function NewSaleController(SaleService, $location) {
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

    $ctrl.returnToPageSales = () => {
        $location.path("/admin/customers")
    }
}

app.component('newSale', {
    templateUrl:'components/new-sale/new-sale.component.html',
    controller: NewSaleController,
})