function ChartSalesByDateComponentController(SaleService) {
    var $ctrl = this;

    var page = 3;

    let chart = Highcharts.chart('sales-by-date', {
        chart: {
            type: 'line',
        },
        title: {
            text: 'Vendas'
        },
        xAxis: {
            categories:[]
        },
        yAxis: {
            title: {
                text: 'Valores'
            }
        },
        series: []
    })

    $ctrl.getSales = () => {
        SaleService.getSalesByDate($ctrl.mindate, $ctrl.maxdate).then((response) => {
            if(chart.series.length > 0) {
                while(chart.series.length > 0) {
                    chart.series[0].remove()
                }
            }
            var sales = response.data.content;
            console.log(sales)
            const date = [];
            sales.map( item => date.push(item.date));
            console.log(date)
            const total = []
            sales.map( item => total.push(item.amount))
            console.log(total);
            const series = {
                name:  'Vendas',
                data: total
            }
            chart.xAxis[0].setCategories(date);
            chart.addSeries(series);
        })
    }

    $ctrl.$onInit = () => {
    }

    $ctrl.$onChanges = (mindate, maxdate) => {
        $ctrl.getSales(mindate, maxdate);
    }
}

app.component('chartSalesByDate', {
    templateUrl:'components/chart-sales-by-date/chart-sales-by-date.component.html',
    controller: ChartSalesByDateComponentController,
    bindings: {
        mindate: '<',
        maxdate: '<'
    }
})