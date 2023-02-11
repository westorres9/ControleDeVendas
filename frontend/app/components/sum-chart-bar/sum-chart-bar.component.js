function SumChartBarController(SaleService) {
    var $ctrl = this;
    $ctrl.getAllSales = getAllSales;
    let sales = [];
    let date = [];
    let visited = [];
    let deals = [];



    let chart = Highcharts.chart('sum-chart-bar', {
        title: {
            text: 'Vendas por periodo'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories:[]
        },
        yAxis: {
            title: {
                text: ''
            }
        }
    });

    function getAllSales() {
        SaleService.getAllSales($ctrl.mindate, $ctrl.maxdate).then((response) => {
            sales = response.data.content;
            sales.forEach(item => date.push(item.date));
            console.log(sales);
            console.log(date);

            chart.xAxis[0].setCategories(date)

            chart.addSeries({
                name: 'Visitas',
                data: [visited]
            });
            chart.addSeries({
                name: 'Vendas',
                data: [deals]
            })
        })
    }

    $ctrl.$onInit = function() {
        
    }

    $ctrl.$onChanges = function(mindate, maxdate) {
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