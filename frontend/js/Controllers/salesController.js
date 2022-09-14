vendasApp.controller('salesController', function(SaleService, AuthService) {
    var vm = this;
    vm.title = 'salesController'
    vm.message = 'SalesController'
    vm.GetAllSales = GetAllSales;
    vm.InsertSale = InsertSale;
    vm.UpdateSale = UpdateSale;
    vm.DeleteSale = DeleteSale;
    vm.SelectSale = SelectSale;

    function SelectSale(sale) {
        vm.sale = sale;
        console.log(vm.sale)
        return vm.sale;
        
    }

    function GetAllSales () {
        var getAllSales = SaleService.getSales();

        getAllSales.then(function(response) {
            vm.sales = response.data.content;
            console.log(response.data.content);
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400 ) {
                window.location.href = '/index.html#/login';
            }
        })
    }

    GetAllSales();

    function InsertSale () {
        var sale = vm.sale;
        var insertSale = SaleService.insert(sale);
        insertSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateSale () {
        var sale = vm.sale;
        var updateSale = SaleService.update(sale);
        updateSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function DeleteSale() {
        var sale = vm.sale;
        var deleteSale = SaleService.delete(sale);
        deleteSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }
})