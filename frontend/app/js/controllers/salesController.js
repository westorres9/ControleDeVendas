vendasApp.controller('salesController', function(SaleService, AuthService) {
    var vm = this;
    vm.title = 'salesController'
    vm.message = 'SalesController'
    vm.GetAllSales = GetAllSales;
    vm.getSaleById = getSaleById;
    vm.InsertSale = InsertSale;
    vm.UpdateSale = UpdateSale;
    vm.DeleteSale = DeleteSale;
    vm.SelectSale = SelectSale;
    var USER_ROLE = AuthService.getAuthority();
    vm.USER_ROLE = USER_ROLE;


    function SelectSale(sale) {
        vm.sale = sale;
        console.log(vm.sale)
        return vm.sale;
    }

    function GetAllSales () {
        var getAllSales = SaleService.getAllSales();

        getAllSales.then(function(response) {
            vm.sales = response.data.content;
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400 ) {
                window.location.href = '/index.html#/login';
            }
        })
    }

    GetAllSales();

    function getSaleById(sale) {
        SaleService.getSaleById(sale.id).then(function(response) {
            vm.sale = response.data;
            window.location.href = `/index.html#/admin/sales/${vm.sale.id}`;
            console.log(vm.sale);
        })
    }

    function InsertSale () {
        var sale = vm.sale;
        var insertSale = SaleService.insertSale(sale);
        console.log(insertSale);
        insertSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateSale () {
        var sale = vm.sale;
        var updateSale = SaleService.updateSale(sale);
        updateSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function DeleteSale() {
        vm.sale = SelectSale(sale);
        var deleteSale = SaleService.deleteSale(vm.sale);
        deleteSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }
})
