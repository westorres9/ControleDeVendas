function SumChartBarController(SaleService) {
    var $ctrl = this;
    $ctrl.getAllSales = getAllSales;
    let sales = [];
    let date = [];
    let visited = [];
    let deals = [];
    function getAllSales() {
        SaleService.getAllSales($ctrl.page, $ctrl.size, $ctrl.mindate, $ctrl.maxdate).then((response) => {
            sales = response.data.content;
            sales.forEach(item => date.push(item.date));
            console.log(sales);
            console.log(date);
        })
    }

    $ctrl.$onInit = function() {
        getAllSales();
    }
   
}
app.component('sumChartBar', {
    templateUrl: 'components/sum-chart-bar/sum-chart-bar.component.html',
    controller: SumChartBarController,
    bindings: {
        mindate: '<',
        maxdate: '<',
        page: '<',
        size: '<'
    }
})