function SumChartBarController(SaleService) {
    var $ctrl = this;

    $ctrl.sales = []
    $ctrl.visited = [];
    $ctrl.deals = [];
    $ctrl.date = [];


    $ctrl.getAllSales = (page, size) => {

        SaleService.getAllSales(page, size).then((response) => {
            $ctrl.page = response.data;
            console.log('sum-chart-bar', response.data.content);
            $ctrl.sales = response.data.content;
            $ctrl.sales.forEach(x => $ctrl.date.push(x.date));
            $ctrl.sales.forEach(x => $ctrl.visited.push(x.visited));
            $ctrl.sales.forEach(x => $ctrl.deals.push(x.deals));
            console.log('sales', $ctrl.sales);
            console.log('date', $ctrl.date);

            Highcharts.chart('sum-chart-bar', {
                chart: {
                    type: 'column',
                },
                title: {
                    text: 'Vendas de todos durante o periodo'
                },
                subtitle: {
                    text: `${$ctrl.date[0]} a ${$ctrl.date[19]}`
                },
                xAxis: {
                    categories: $ctrl.date,
                    crosshair: true
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: 'Total de vendas'
                    }
                },
                tooltip: {
                    headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                    pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
                        '<td style="padding:0"><b>{point.y}</b></td></tr>',
                    footerFormat: '</table>',
                    shared: true,
                    useHTML: true
                },
                plotOptions: {
                    column: {
                        pointPadding: 0.2,
                        borderWidth: 0
                    }
                },
                series: [
                    {
                        name: 'Visitas',
                        data: $ctrl.visited
                    },
                    {
                        name: 'Vendas',
                        data: $ctrl.deals
                    }
                ]
            });
        });
    };
    $ctrl.$onInit = () => {
        $ctrl.getAllSales();
    }

    $ctrl.onChanges = (page, size, minDate,maxDate) => {
        $ctrl.getAllSales(page, size, minDate,maxDate);
      }
}

app.component('sumChartBar', {
    templateUrl: 'components/sum-chart-bar/sum-chart-bar.component.html',
    controller: SumChartBarController,
    bindings: {
        minDate: '<',
        maxDate: '<',
        onChanges: '&'
    }
})