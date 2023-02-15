function PieChartTeamSellerController (SaleService) {
    var $ctrl = this;
    $ctrl.sumByTeam = sumByTeam;
    var sellers = [];

    let chart = Highcharts.chart('pie-chart-team-seller',{
        chart: {
            type: 'pie',
            events: {
                drilldown: function (e) {
                    console.log('point', e.point);
                    console.log('e.point.name', e.point.name);
                    console.log('e.point.info', e.point.info)
                    var chart = this
                    if (e.point.info == 1) {
                        console.log('info: ' + e.point.info)
                        SaleService.sellersByTeam(e.point.info).then((response) => {
                            sellers = response.data;
                            console.log('sellers', sellers);
                            var sellerdata = [];

                            sellers.forEach(item => sellerdata.push({
                                name: item.sellerName,
                                y: item.amount
                            }))
                            console.log('sellerdata', sellerdata);
                            var series = {
                                name: 'Vendas',
                                colorByPoint: true,
                                data: sellerdata

                            }
                            chart.addSeriesAsDrilldown(e.point, series)
                        })
                    }
                    else if (e.point.info == 2) {
                        console.log('info: ' + e.point.info)
                        SaleService.sellersByTeam(e.point.info).then((response) => {
                            sellers = response.data;
                            console.log('sellers', sellers);
                            var sellerdata = [];

                            sellers.forEach(item => sellerdata.push({
                                name: item.sellerName,
                                y: item.amount
                            }))
                            console.log('sellerdata', sellerdata);
                            var series = {
                                name: 'Vendas',
                                colorByPoint: true,
                                data: sellerdata

                            }
                            chart.addSeriesAsDrilldown(e.point, series)
                    })
                    }
                    else if (e.point.info == 3) {
                        console.log('info: ' + e.point.info)
                        SaleService.sellersByTeam(e.point.info).then((response) => {
                            sellers = response.data;
                            console.log('sellers', sellers);
                            var sellerdata = [];

                            sellers.forEach(item => sellerdata.push({
                                name: item.sellerName,
                                y: item.amount
                            }))
                            console.log('sellerdata', sellerdata);
                            var series = {
                                name: 'Vendas',
                                colorByPoint: true,
                                data: sellerdata

                            }
                            chart.addSeriesAsDrilldown(e.point, series);
                    })
                    }
            }},
            title: {
                text: 'Total de Vendas por Equipe',
                align: 'left'
            },
            tooltip: {
                pointFormat: '<b> {series.name}</b> : {point.percentage:.1f} %'
            },
            acessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b> {point.name}</b>: {point.percentage:.1f} %'
                    }
                }
            },
            series: [],
            drilldown: {
                series: []
              }
    }})

    function sumByTeam() {
        SaleService.salesSumByTeam().then((response) => {
            salesSumByTeam = response.data;
            console.log('sales sum by team',salesSumByTeam);
            var teams = []
            salesSumByTeam.forEach(item => teams.push({
                name:item.teamName,
                info: item.id,
                y: item.sum,
                drilldown: true
            }))
            console.log('data',teams);
            chart.addSeries({
                name: 'Percentual',
                colorByPoint: true,
                data: teams
               
            })
    })}

    $ctrl.$onInit = () => {
        sumByTeam()
    }

}

app.component('pieChartTeamSeller', {
    templateUrl: 'components/pie-chart-team-seller/pie-chart-team-seller.component.html',
    controller: PieChartTeamSellerController,
    bindings: {
        minDate: '=',
        maxDate: '=',
        onChanges: '&'
    }
})