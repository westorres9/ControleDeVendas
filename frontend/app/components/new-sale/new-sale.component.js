function NewSaleController(SaleService, CustomerService,ProductService, $location, toaster) {
    var $ctrl = this;
    $ctrl.sale = {};
    $ctrl.customer = {};
    $ctrl.sale.customer = {};
    $ctrl.sale.items = [];
    $ctrl.quantity = 1;
    $ctrl.saleItem = {};
    $ctrl.total = 0;

    $ctrl.insertSale = () => {
        $ctrl.sale.customer = $ctrl.customer;
        SaleService.insertSale($ctrl.sale).then((response) => {
            console.log(response.data); 
            $ctrl.popSuccess();
            toaster.clear($ctrl.popSuccess);        
        }).catch((error) => {
            console.log(error);
            $ctrl.popError();
            toaster.clear($ctrl.popError)
        }).finally(
            $ctrl.returnToPageSales()
        )
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

    $ctrl.addToCart = (product) => {
        $ctrl.product = product;
        $ctrl.saleItem = {
            productId: $ctrl.product.id,
            name: $ctrl.product.name,
            price: $ctrl.product.price,
            quantity: $ctrl.quantity,
            imgUrl: $ctrl.product.imgUrl
        }
        $ctrl.total += $ctrl.saleItem.price * $ctrl.saleItem.quantity;
        const item = $ctrl.sale.items.find(x => x.productId === $ctrl.saleItem.productId);
        if (!item) {
            $ctrl.sale.items.push($ctrl.saleItem);
        }
        else {
            $ctrl.increaseCartQuantity();
        }
        $ctrl.quantity = 1;
    }

    $ctrl.increaseProductQuantity = () => {
        $ctrl.quantity++
    }

    $ctrl.decreaseProductQuantity = () => {
        if($ctrl.quantity > 1) {
            $ctrl.quantity --;
        }
        else {
            $ctrl.quantity = 1;
        }
    }

    $ctrl.increaseCartQuantity = () => {
        $ctrl.saleItem.quantity++
    }

    $ctrl.decreaseCartQuantity = () => {
        if($ctrl.saleItem.quantity > 1) {
            $ctrl.saleItem.quantity --;
        }
        else {
            $ctrl.sale.items.pop();
        }
    }

    $ctrl.$onInit = () => {
        $ctrl.getCustomers();
        $ctrl.getProducts();
    }

    $ctrl.returnToPageSales = () => {
        $location.path("/admin/sales")
    }

    $ctrl.popSuccess = function () {
        toaster.pop({ type: 'success', body: 'Venda cadastrada com sucesso', toasterId: 1 });
    }
          
    $ctrl.popError = function () {
        toaster.pop({ type: 'error', body: 'Erro ao cadastrar venda', toasterId: 2 });
    }
}

app.component('newSale', {
    templateUrl:'components/new-sale/new-sale.component.html',
    controller: NewSaleController,
})