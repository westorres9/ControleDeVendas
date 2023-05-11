function SalesBySellerChartController(SaleService) {
    var $ctrl = this;
    $ctrl.getAllSales = getAllSales;
    var sales = [];
    var visited = [];
    var deals = [];
    var date = [];
    var amount = [];
    var id = [];
    var salesdata = [];

    let chart = Highcharts.chart('sales-by-seller', {
        chart: {
            type: 'line',
            events: {
                drilldown: function (e) {
                    console.log('point', e.point);
                    console.log('e.point.name', e.point.name);
                    console.log('e.point.info', e.point.info);
                    var chart = this;
                    SaleService.getAllSales(e.point.info, $ctrl.mindate, $ctrl.maxdate).then((response) => {
                        salesdata = response.data.content;
                        console.log('salesdata', salesdata);

                        salesdata.forEach(item => date.push(
                            item.date
                        ));


                        salesdata.forEach(item => amount.push(
                            item.amount
                        ));

                        var series = {
                            name: 'amount',
                            colorByPoint: true,
                            data: salesdata
                        }

                        var categories = date;

                        chart.addSeriesAsDrilldown(e.point, series, categories);
                    })

                }
            }
        },
        title: {
            text: 'Total de vendas por periodo'
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            title: 'Vendas',
            categories: $ctrl.date,
            crosshair: true
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        drilldown: {
            series: []
        }
    })

    function getAllSales() {
        SaleService.getAllSales($ctrl.mindate, $ctrl.maxdate).then((response) => {
            while (chart.series.length > 0) {
                console.log('removing series');
                chart.series[0].remove();
            }
            while (chart.yAxis.length > 0) {
                console.log('removing axis');
                chart.yAxis[0].remove();
            }
            sales = [];
            deals = [];
            calls = [];
            sales = response.data.content;

            sales.forEach(item => visited.push(
                item.visited
            ))
            console.log('visited', visited);
            sales.forEach(item => id.push(
                item.id
            ))
            console.log('id', id);
            sales.forEach(item => deals.push(
                item.deals
            ))
            console.log('deals', deals);

            moment.locale('pt-br');
            var mindateFormated = moment($ctrl.mindate).format('L');
            var maxdateFormated = moment($ctrl.maxdate).format('L');
            chart.setSubtitle({
                text: `Vendas no periodo de ${mindateFormated} a ${maxdateFormated}`
            })
            chart.addAxis(({
                title: {
                    text: 'vendas x visitas'
                }
            }))
            chart.addSeries({
                name: 'Visitas',
                data: visited,
                info: visited,
                drilldown: true
            })
            chart.addSeries({
                name: 'Vendas',
                data: deals,
                info: deals,
                drilldown: true
            });
        })
    }
    $ctrl.$onInit = () => {
    }

    $ctrl.$onChanges = (mindate, maxdate, page) => {
        getAllSales(mindate, maxdate, page);
    }

}
app.component('salesBySellerChart', {
    templateUrl: 'components/sales-by-seller-chart/sales-by-seller-chart.component.html',
    controller: SalesBySellerChartController,
    bindings: {
        mindate: '<',
        maxdate: '<',
    }
})