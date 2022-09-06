vendasApp.controller('salesController', function(SaleService) {
    var vm = this;
    vm.title = 'salesController'
    vm.message = 'SalesController'
    vm.GetAllSales = GetAllSales;

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
})