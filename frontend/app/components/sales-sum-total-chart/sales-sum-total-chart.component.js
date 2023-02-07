function SalesSumTotalChartController(SaleService) {
    var $ctrl = this;
    $ctrl.sumTotal = []
    $ctrl.Highcharts = {};


    $ctrl.salesSumTotal = () => {
        SaleService.salesSumTotal().then((response) => {
          console.log(response.data);
          $ctrl.sumTotal = response.data;
          console.log("sumtotal", $ctrl.sumTotal)
          console.log('O chart está sendo criado. Essa mensagem deve aparecer APENAS UMA VEZ!');
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
                text: `Taxa de sucesso ${100 - ((($ctrl.sumTotal.visited -  $ctrl.sumTotal.deals)/$ctrl.sumTotal.visited) * 100).toFixed(2) } % <br/><br/> Total de vendas em R$ ${$ctrl.sumTotal.amount}`,
              },
              subtitle: {
                text: ``
              }
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
    bindings: {
      previousPage: '<',
      nextPage:'<'
    }
   
})