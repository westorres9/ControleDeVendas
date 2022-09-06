vendasApp.controller('salesController', function(SaleService) {
    var vm = this;
    vm.title = 'salesController'
    vm.message = 'SalesController'
    vm.GetAllSales = GetAllSales;
    vm.InsertSale = InsertSale;
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
        })
    }

    GetAllSales();

    function InsertSale () {
        var sale = vm.sale;
        var InsertSale = SaleService.InsertSale(sale);
        InsertSale.then(function(response) {
            vm.sales = response.data.content;
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }
})