function SumChartController (SaleService) {
    var $ctrl = this;

    $ctrl.sum = []

    $ctrl.sumBySeller = () => {
        SaleService.salesSumBySeller().then((response) => {
          console.log(response.data);
          $ctrl.sum = response.data;
          Highcharts.chart("sum", {
            chart: {
              type: "column",
            },
            title: {
              text: "Total de vendas",
            },
            subtitle: {
              text: `Vendedor: ${$ctrl.sum[0].sellerName}`,
            },
            xAxis: {
              categories: ["Visitas", "Vendas", "Total"],
            },
            yAxis: {
              title: {
                text: "Taxa de sucesso",
              },
            },
            series: [
              {
                name: "Total vendido",
                data: [$ctrl.sum[0].sum],
              }
            ]
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
})