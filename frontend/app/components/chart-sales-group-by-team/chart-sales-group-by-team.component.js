function ChartSalesGroupByTeamComponentController(SaleService) {
    var $ctrl = this;

    $ctrl.salesGroupByTeam = [];

    var chart = Highcharts.chart('sales-group-by-team', {
        chart: {
            type: 'pie',
        },
        title: {
            text:'Vendas por Equipe'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: true,
                    format:'<b>{point.name}</b>: {point.percentage:.1f} %'
                }
            }
        },
        series: [
            {
                name: 'Vendas',
                colorByPoint: true,
                data: [],
                dataGrouping: {
                    enabled: false
                }
            }
        ]
    })
    

    $ctrl.getSalesGroupByTeam = () => {
        SaleService.getSalesGroupByTeam($ctrl.mindate, $ctrl.maxdate).then((response) => {
            if(chart.series.length > 0) {
                while(chart.series.length > 0) {
                    chart.series[0].remove()
                }
            }
            var data = response.data;
            var salesGroupByTeam = [];
            data.map(item => salesGroupByTeam.push([item.teamName, item.sum]));
            console.log(salesGroupByTeam);
            chart.addSeries({
                name: 'Vendas',
                colorByPoint: true,
                data: [],
                dataGrouping: {
                    enabled: false
                }
            })
            console.log(chart.series)
            chart.series[0].setData(salesGroupByTeam)
            
        })
    }

    $ctrl.$onInit = () => {
    }



    $ctrl.$onChanges = (mindate, maxdate) => {
        $ctrl.getSalesGroupByTeam(mindate, maxdate);
    }

}

app.component('chartSalesGroupByTeam', {
    templateUrl:'components/chart-sales-group-by-team/chart-sales-group-by-team.component.html',
    controller: ChartSalesGroupByTeamComponentController,
    bindings: {
        mindate: '<',
        maxdate: '<'
    }
})