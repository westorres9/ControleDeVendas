function NewSaleController(SaleService, $window) {
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
        $window.location.href = "index.html#/admin/sales"
    }
}

app.component('newSale', {
    templateUrl:'components/new-sale/new-sale.component.html',
    controller: NewSaleController,
})