
function SalesSumTotalChartController(SaleService) {
    var $ctrl = this;
    $ctrl.sumTotal = []
    $ctrl.Highcharts = {};

    
    $ctrl.salesSumTotal = () => {
        SaleService.salesSumTotal().then((response) => {
          console.log(response.data);
          $ctrl.sumTotal = response.data;
          console.log("sumtotal", $ctrl.sumTotal)
          Highcharts.chart("sales-sum-total", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Visitas x vendas",
            },
            xAxis: {
              categories: ["Visitas", "Vendas", "Total"],
            },
            yAxis: {
              title: {
                text: `Taxa de sucesso ${((($ctrl.sumTotal.visited -  $ctrl.sumTotal.deals)/$ctrl.sumTotal.deals) * 100).toFixed(2) } %`,
              },
            },
            series: [
              {
                name: "Visitas",
                data: [$ctrl.sumTotal.visited],
              },
              {
                name: "Vendas",
                data: [$ctrl.sumTotal.deals],
              }
            ],
          });
        });
      };

    
      $ctrl.$onInit = () => {
        $ctrl.salesSumTotal()
        }
}

app.component('salesSumTotalChart', {
    templateUrl: 'components/sales-sum-total-chart/sales-sum-total-chart.component.html',
    controller: SalesSumTotalChartController,
})