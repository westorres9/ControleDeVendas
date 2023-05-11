function UpdateSaleController(SaleService, $location) {
    var $ctrl = this;

    $ctrl.saleStatus = ['PAID', 'DELIVERED', 'FINISH', 'CANCELED']
    $ctrl.statusSelected = ''

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
        $ctrl.registryPayment();
        if($ctrl.sale.status === 'FINISH') {
            SaleService.updateSaleSetFinish($ctrl.sale).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error.status)
            })
        }
        else if($ctrl.sale.status ==='CANCELED') {
            SaleService.updateSaleSetCanceled($ctrl.sale).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error.status)
            })
        }
    }

    $ctrl.registryPayment = () => {
        $ctrl.sale.status = 'FINISH';
        $ctrl.sale.payment = {
            id: $ctrl.sale.id
        }
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