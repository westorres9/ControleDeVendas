function SumChartController (SaleService) {
    var $ctrl = this;

    $ctrl.sum = []
    $ctrl.teams = [];

    $ctrl.sumBySeller = () => {
        SaleService.salesSumByTeam().then((response) => {
          console.log('sum',response.data);
          $ctrl.sum = response.data;
          Highcharts.chart('sum', {
            chart: {
                plotBackgroundColor: null,
                plotBorderWidth: null,
                plotShadow: false,
                type: 'pie'
            },
            title: {
                text: 'Total de vendas por Equipe',
                align: 'left'
            },
            tooltip: {
                pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
            },
            accessibility: {
                point: {
                    valueSuffix: '%'
                }
            },
            plotOptions: {
                pie: {
                    allowPointSelect: true,
                    cursor: 'pointer',
                    dataLabels: {
                        enabled: true,
                        format: '<b>{point.name}</b>: {point.percentage:.1f} %',
                    }
                }
            },
            series: [{
                name: 'Percentual',
                colorByPoint: true,
                data: [{
                    name: $ctrl.sum[0].teamName,
                    y: $ctrl.sum[0].sum,
                    drilldown: `${$ctrl.sum[0].teamName}`
                }, {
                    name: $ctrl.sum[1].teamName,
                    y: $ctrl.sum[1].sum,
                    drilldown: `${$ctrl.sum[1].teamName}`
                },  {
                    name:$ctrl.sum[2].teamName,
                    y: $ctrl.sum[2].sum,
                    drilldown: `${$ctrl.sum[2].teamName}`
                }]
            }],
            drilldown:{
                series: [
                    {
                        id: $ctrl.sum[0].teamName,
                        data: [
                            [$ctrl.sum[0].teamName, $ctrl.sum[0].sum]
                        ],
                        id: $ctrl.sum[1].teamName,
                        data: [
                            [$ctrl.sum[1].teamName, $ctrl.sum[1].sum]
                        ],
                        id: $ctrl.sum[2].teamName,
                        data: [
                            [$ctrl.sum[2].teamName, $ctrl.sum[2].sum]
                        ]
                    }
                ]
            }
        });
            
        });
      };

    

    $ctrl.$onInit = () => {
        $ctrl.sumBySeller();
        }

}

app.component('sumChart', {
    templateUrl: 'components/sum-chart/sum-chart.component.html',
    controller: SumChartController,
    bindings: {
        minDate: '=',
        maxDate: '=',
        onChanges: '&'
    }
})