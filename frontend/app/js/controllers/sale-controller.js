myApp.controller('saleCtrl', function (SaleService, AuthService) {
    vm = this;
    vm.title = 'saleCtrl'
    vm.GetAllSales = GetAllSales;
    vm.SelectSale = SelectSale;
    vm.InsertSale = InsertSale;
    vm.UpdateSale = UpdateSale;
    vm.DeleteSale = DeleteSale;
    vm.ShowForm = ShowForm;
    vm.CloseForm = CloseForm;
    vm.ShowFormNew = ShowFormNew;
    vm.CloseFormNew = CloseFormNew;
    vm.ShowWarning = ShowWarning;
    vm.CloseWarning = CloseWarning;
    vm.SelectToDelete = SelectToDelete;
    var formNewVisible = false;
    vm.formNewVisible = formNewVisible;
    var formVisible = false;
    vm.formVisible = formVisible;
    var warningVisible = false;
    vm.warningVisible = warningVisible;

    function ShowWarning() {
        vm.warningVisible = true;
        console.log('warningVisible', vm.warningVisible)
    }

    function CloseWarning () {
        vm.warningVisible = false;
        console.log('warningVisible', vm.warningVisible)
    }

    function ShowFormNew() {
        vm.formNewVisible = true;
        console.log('formNewVisible', vm.formNewVisible)
    }

    function CloseFormNew() {
        vm.formNewVisible = false
        console.log('formNewVisible', vm.formNewVisible)
    }

    function ShowForm() {
        vm.formVisible = true;
        console.log('formVisible', vm.formVisible)
    }

    function CloseForm() {
        vm.formVisible = false
        console.log('formVisible', vm.formVisible)
    }

    function GetAllSales() {
        var getAllSales = SaleService.getAllSales();

        getAllSales.then(function (response) {
            vm.sales = response.data.content;
            console.log(vm.sales)
        }).catch(function (error) {
            console.log('ERROR: ' + error.status, error);
            if (error.status >= 400) {
                window.location.href = '/index.html#/login';
            }
        })
    }
    GetAllSales();

    function SelectToDelete(sale) {
        ShowWarning();
        vm.sale = sale;
        console.log(vm.sale)
        return vm.sale;
    }

    function SelectSale(sale) {
        ShowForm();
        vm.sale = sale;
        console.log(vm.sale);
        return vm.sale;
    }

    function InsertSale () {
        var sale = vm.sale;
        var insertSale = SaleService.insertSale(sale);
        insertSale.then(function(response) {
            console.log(response.data)
            vm.sales = response.data.content;
            CloseFormNew();
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function UpdateSale(sale) {
        var sale = vm.sale;
        var updateSale = SaleService.updateSale(sale);
        updateSale.then(function(response) {
            console.log(response.data);
            vm.sales = response.data.content;
            CloseForm();
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }

    function DeleteSale(sale) {
        vm.sale = SelectToDelete(sale);
        var deleteSale = SaleService.deleteSale(vm.sale);
        deleteSale.then(function(response) {
            vm.sales = response.data.content;
            CloseWarning();
            GetAllSales();
        }).catch(function(error) {
            console.log('ERROR: ' + error.status, error);
        });
    }
});