function SalesSumTotalChartController(SaleService) {
  var $ctrl = this;
  $ctrl.salesSumTotal = salesSumTotal;
  $ctrl.salesSumTotalByMonth = salesSumTotalByMonth;
  moment.locale('en');
  let sum;
  let sumByMonth = [];
  let visited = [];
  let deals = [];
  let month = [];
  console.log($ctrl.mindate);
  console.log($ctrl.maxdate);

  let chart;
  chart = Highcharts.chart("sales-sum-total", {
    chart: {
      type:'bar',
      events: {
        drilldown: function(e) {
          console.log('point', e.point.data);
          console.log('point.name', e.point.name);
          console.log('point.info', e.point.info);
          console.log('point.y', e.point.y)
          var chart = this;
          SaleService.salesSumTotalByMonth($ctrl.mindate, $ctrl.maxdate).then((response) => {
          sumByMonth = response.data;
          console.log('sumByMonth', sumByMonth)
          sumByMonth.forEach(x => visited.push(x.visited));
          sumByMonth.forEach(x => deals.push(x.deals));
          sumByMonth.forEach(x => month.push(x.month));
          console.log('deals', deals)
          console.log('deals', visited)
          
          
          var series1 = {
            name: 'visitas do mes',
            data: visited
          }
          var series2 = {
            name: 'vendas do mes',
            data: deals
          }
          chart.addSeriesAsDrilldown(e.point, series1, series2);
        }
      )}}
    },
    title: {
      text: "Visitas x vendas"
    },
      subtitle: {
        text: ''
      },
    xAxis:{ 
      categories: month
    },
    yAxis: {
      title: {
        text: ''
      }
    },
    series: [],

    drilldown: {
      type: 'column',
      series: []
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
      chart.drillUp();
      

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
        data: [{y: sum.visited, info: 'Visited' , drilldown: true }],
        
      })
      chart.addSeries({
        name: 'Vendas',
        data: [{y: sum.deals, info: 'Deals' , drilldown: true }],
      });  
    })
  }

  function salesSumTotalByMonth() {
      SaleService.salesSumTotalByMonth($ctrl.mindate, $ctrl.maxdate).then((response) => {
        sumByMonth = response.data;
        chart.drillUp();
        while (chart.series.length > 0) {
          console.log('Removing serie');
            chart.series[0].remove();
        }
        while (chart.yAxis.length > 0) {
          chart.yAxis[0].remove();//creditos Betim
        }
        
        console.log('sumByMonth', sumByMonth)
        sumByMonth.forEach(x => visited.push(x.visited));
        sumByMonth.forEach(x => deals.push(x.deals));
        sumByMonth.forEach(x => month.push(x.month));
        console.log('deals', deals)
        console.log('deals', visited)
        
        var series1 = {
          name: 'visitas do mes',
          data: visited
        }
        var series2 = {
          name: 'vendas do mes',
          data: deals
        }
        chart.addSeriesAsDrilldown(e.point, series1, series2);
    })

  }

  $ctrl.$onInit = function() {
  }

  $ctrl.$onChanges = function(mindate, maxdate) {
    chart.xAxis.categories = ['']
    salesSumTotal();
    salesSumTotalByMonth();
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