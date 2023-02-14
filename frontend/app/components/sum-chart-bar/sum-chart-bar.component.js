function SumChartBarController(SaleService) {
    var $ctrl = this;
    $ctrl.getAllSales = getAllSales;
    let sales = [];
    let date = [];
    let visited = [];
    let deals = [];



    let chart = Highcharts.chart('sum-chart-bar', {
        type: 'column',
        events: {
            drilldown: function(e) {
                console.log('point', e.point.data);
                console.log('point.name', e.point.name);
                console.log('point.info', e.point.info);
                console.log('point.y', e.point.y)
                var chart = this;
                SaleService.getAllSales($ctrl.mindate, $ctrl.maxdate).then((response) => {
                    sales = response.data.content;
                    sales.forEach(item => date.push(item.date));
                    console.log('date', date)
                    var series = {
                        name: 'Cars',
                        data : [
                            ['toyota', 1],
                            ['Volkswagen', 2],
                            ['Opel', 5]
                        ]
                    }
                    chart.addSeriesAsDrilldown(e.point, series);
                })
            }
        },
        title: {
            text: 'Vendas durante o periodo'
        },
        xAxis: {
            categories: date
        }
    });

    function getAllSales() {
        SaleService.getAllSales($ctrl.mindate, $ctrl.maxdate).then((response) => {
            sales = response.data.content;
            sales.forEach(item => date.push(item.date));
            sales.forEach(item => deals.push(item.deals));
            sales.forEach(item => visited.push(item.visited));
            chart.addSeries({
                name: 'Visitas',
                data: visited
            });
            chart.addSeries({
                name: 'Vendas',
                data: deals
            })
        })
    }

    $ctrl.$onInit = function() {
        getAllSales();
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