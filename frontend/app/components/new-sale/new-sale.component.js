function NewSaleController(SaleService, CustomerService,ProductService, $location) {
    var $ctrl = this;
    $ctrl.sale = {};
    $ctrl.customer = {};
    $ctrl.sale.customer = {};
    $ctrl.sale.items = [];
    $ctrl.saleItem = {};

    $ctrl.insertSale = () => {
        SaleService.insertSale($ctrl.sale).then((response) => {
            console.log(response.data);
            $ctrl.returnToPageSales();
        }).catch((error) => {
            console.log(error)
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

    $ctrl.addToCart = (product) => {
        $ctrl.product = product;
        $ctrl.saleItem = {
            productId: $ctrl.product.id,
            name: $ctrl.product.name,
            price: $ctrl.product.price,
            quantity: 1,
            imgUrl: $ctrl.product.imgUrl
        }
        $ctrl.sale.items.push($ctrl.saleItem);
    }

    $ctrl.increaseQuantity = () => {
        $ctrl.saleItem.quantity++
    }

    $ctrl.decreaseQuantity = () => {
        if($ctrl.saleItem.quantity > 1) {
            $ctrl.saleItem.quantity--;
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
}

app.component('newSale', {
    templateUrl:'components/new-sale/new-sale.component.html',
    controller: NewSaleController,
})