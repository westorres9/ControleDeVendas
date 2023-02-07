
function SuccessChartController(SaleService) {
    var $ctrl = this;
    $ctrl.success = []
    $ctrl.Highcharts = {};

    
    $ctrl.successBySeller = () => {
        SaleService.salesSuccessBySeller().then((response) => {
          console.log(response.data);
          $ctrl.success = response.data;
          Highcharts.chart("success", {
            chart: {
              type: "bar",
            },
            title: {
              text: "Visitas x vendas",
            },
            subtitle: {
              text: `Vendedor: ${$ctrl.success[0].sellerName}`,
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
                name: "Visitas",
                data: [$ctrl.success[0].visited],
              },
              {
                name: "Vendas",
                data: [$ctrl.success[0].deals],
              },
              {
                name: "Sucesso",
                data: [
                  (($ctrl.success[0].deals * 100) / $ctrl.success[0].visited)
                ],
              },
            ],
          });
        });
      };

    
      $ctrl.$onInit = () => {
        $ctrl.successBySeller()
        }
}

app.component('successChart', {
    templateUrl: 'components/success-chart/success-chart.component.html',
    controller: SuccessChartController,
    bindings: {
      minDate: '=',
      maxDate: '=',
      onChanges: '&'
  }
})