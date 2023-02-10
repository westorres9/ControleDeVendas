function SalesSumTotalChartController(SaleService) {
  var $ctrl = this;
  $ctrl.salesSumTotal = salesSumTotal;
  moment.locale('en');
  let visited;
  let deals;
  let amount;
  let sum;
  console.log($ctrl.mindate);
  console.log($ctrl.maxdate);

  let chart;
  chart = Highcharts.chart("sales-sum-total", {
    chart: {
      type:'bar',
    },
    title: {
      text: "Visitas x vendas"
    },
      subtitle: {
        text: ''
      },
    xAxis:{ 
      categories: ['Visitas', 'Vendas', 'Total']
    },
    yAxis: {
      title: {
        text: ''
      }
    }
  })

  function salesSumTotal() {
    SaleService.salesSumTotal($ctrl.mindate, $ctrl.maxdate).then((response) => {
      sum = response.data

      while (chart.series.length > 0) {
        console.log('Removing serie');
          chart.series[0].remove();
      }
      while (chart.yAxis.length > 0) {
        chart.yAxis[0].remove();//creditos Betim
      }


      chart.setSubtitle({
        text: `Vendas no periodo de ${$ctrl.mindate} e ${$ctrl.maxdate}`
      });
      chart.addAxis(({
        title: {
          text: `Taxa de sucesso: ${100 - (((sum.visited - sum.deals)/ sum.visited) * 100).toFixed(2)} % <br/><br/> Total de vendas em R$ ${sum.amount}`
        }
      }))
      chart.addSeries({
        name: 'Visitas',
        data: [sum.visited]
      })
      chart.addSeries({
        name: 'Vendas',
        data: [sum.deals]
      })
    })
  }

  $ctrl.$onInit = function() {
  }

  $ctrl.$onChanges = function(mindate, maxdate) {
    salesSumTotal();
  }

}





app.component('salesSumTotalChart', {
  templateUrl: 'components/sales-sum-total-chart/sales-sum-total-chart.component.html',
  controller: SalesSumTotalChartController,
  bindings: {
    mindate: '<',
    maxdate: '<'
  }

})