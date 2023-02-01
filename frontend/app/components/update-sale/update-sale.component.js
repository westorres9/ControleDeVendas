function UpdateSaleController(SaleService, $location) {
    var $ctrl = this;

    

    $ctrl.getSaleById = (id) => {
        
        SaleService.getSaleById(id).then((response) => {
            console.log(response.data);
            $ctrl.sale = response.data;
        }).catch((error) => {
            console.log(error.status)
        })
    }

    $ctrl.$onInit = () => {
        var id = $location.path()
        id = id.substring(13)
        console.log(id)
        $ctrl.getSaleById(id)
    }

    $ctrl.updateSale = () => {   
        SaleService.updateSale($ctrl.sale).then((response) => {
            console.log(response.data);
            window.location = "index.html#/admin/sales"
        }).catch((error) => {
            console.log(error.status)
        })
    }

    $ctrl.returnToPageSales = () => {
        window.location.href = "index.html#/admin/sales"
    }

}

app.component('updateSale', {
    templateUrl:'components/update-sale/update-sale.component.html',
    controller: UpdateSaleController,
    bindings: {
        sale: '<'
    }
})