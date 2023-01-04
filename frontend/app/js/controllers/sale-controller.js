myApp.controller('saleCtrl', function (SaleService, AuthService) {
    vm = this;
    vm.title = 'saleCtrl'
    vm.Highcharts = Highcharts;
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
    vm.SelectMinDate = SelectMinDate;
    vm.SelectMaxDate = SelectMaxDate;
    var formNewVisible = false;
    vm.formNewVisible = formNewVisible;
    var formVisible = false;
    vm.formVisible = formVisible;
    var warningVisible = false;
    vm.warningVisible = warningVisible;
    var minDate = vm.minDate;
    var maxDate = vm.maxDate;

    

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
        var min = '2022-01-01'
        var max = '2022-06-16'
        var getAllSales = SaleService.getAllSales(min, max);

        getAllSales.then(function (response) {
            vm.sales = response.data.content;
            console.log(vm.sales)
            var visited = [];
            var deals = [];
            var amount = [];
            var date = [];
            vm.sales.forEach(x => visited.push(x.visited))
            vm.sales.forEach(x => deals.push(x.deals))
            vm.sales.forEach(x => amount.push(x.amount))
            vm.sales.forEach(x => date.push(x.date))
            vm.visited = visited;
            vm.deals = deals;
            vm.amount = amount;
            vm.date = date;
            console.log("visitas", vm.visited);
            console.log("vendas", vm.deals);
            console.log("total", vm.amount);
            console.log("data", vm.date);

            vm.SelectMinDate(min);
            vm.SelectMaxDate(max);

            var minDate = new Date(min)
            minDate = (minDate.getFullYear() + "-" + ((minDate.getMonth() + 1)) + "-" + (minDate.getDate())) ;                 
            var maxDate = new Date(max)
            maxDate = (maxDate.getFullYear() + "-" + ((maxDate.getMonth() + 1)) + "-" + (maxDate.getDate())) ;                 
            vm.minDate = minDate;
            vm.maxDate = maxDate;
            console.log(vm.minDate);
            console.log(vm.maxDate);

           

            Highcharts.chart('container3', {
                chart: {
                    type: 'column'
                },
                title: {
                    text: `Vendas do Vendedor (a) ${vm.sales[0].sellerName}`
                },
                subtitle: {
                    text: 'Vendas no periodo 2022'
                },
                xAxis: {
                    categories: vm.date,
                    crosshair:true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: `Total de vendas`
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.1,
                        borderWidth: 0
                    }
                },
                series: [
                {
                    name: 'Visitas',
                    data: vm.visited
                }, {
                    name: 'Vendas ',
                    data: vm.deals
        
                }, {
                    name: 'Total',
                    data: vm.amount
                }]
            })    
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

    function SelectMinDate(minDate) {
        vm.minDate = minDate
        console.log(minDate);
        return vm.minDate;
    }

    function SelectMaxDate(maxDate) {
        vm.maxDate = maxDate;
        console.log(maxDate);
        return vm.maxDate
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