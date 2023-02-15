function SalesSumTotalChartController(SaleService) {
  var $ctrl = this;
  let visited = [];
  let deals = [];
  let date = [];
  $ctrl.salesSumTotal = salesSumTotal;
  //$ctrl.salesSumTotalByMonth = salesSumTotalByMonth;

  let chart = Highcharts.chart('sales-sum-total', {
    chart: {
      type: 'bar',
      events: {
        drilldown: function (e) {
          console.log('point', e.point);
          console.log('e.point.name', e.point.name);
          console.log('e.point.info', e.point.info)
          var chart = this;

          if (e.point.info == 'visited') {
            SaleService.searchDrilldown(e.point.info).then((response) => {
              sum = response.data;
              console.log('visited')
              sum.forEach(x => visited.push(x.visited));
              console.log(visited)
              var series = {
                name: 'visitas',
                data: visited
              }
              chart.addSeriesAsDrilldown(e.point, series)
            })
          }
          else {
            SaleService.searchDrilldown(e.point.info).then((response) => {
              sum = response.data;
              console.log('deals')
              sum.forEach(x => deals.push(x.deals));
              console.log(deals)
              var series = {
                name: 'vendas',
                data: deals
              }
              chart.addSeriesAsDrilldown(e.point, series)
            })
          }

        }
      }
    },
    title: {
      text: 'Visitas x vendas'
    },
    subtitle: {
      text: ''
    },
    xAxis: {
      categories: []
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [],

    drilldown: {
      series: []
    }
  })



  function salesSumTotal() {
    SaleService.salesSumTotal($ctrl.mindate, $ctrl.maxdate).then((response) => {
      sum = response.data;

      setTimeout(function() {
        chart.drillUp();

        while (chart.series.length > 0) {
          console.log('removing series');
          chart.series[0].remove();
        }
        while (chart.yAxis.length > 0) {
          console.log('removing axis');
          chart.yAxis[0].remove();
        }

        console.log('sumTotal', sum);
      chart.setSubtitle({
        text: `Vendas no periodo de ${$ctrl.mindate} a ${$ctrl.maxdate}`
      })
      chart.addAxis(({
        title: {
          text: `Taxa de sucesso: ${100 - (((sum.visited - sum.deals) / sum.visited) * 100).toFixed(2)} % <br/><br/> Total de vendas em R$ ${sum.amount}`
        }
      }))
      chart.addSeries({
        name: 'Visitas',
        data: [{ y: sum.visited, info: 'visited', drilldown: true }]
      })
      chart.addSeries({
        name: 'Vendas',
        data: [{ y: sum.deals, info: 'deals', drilldown: true }]
      })
      }, 500)
      
    })
  }

  $ctrl.$onInit = () => {
  }

  $ctrl.$onChanges = () => {
    salesSumTotal();
    chart.drillUp();
      
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