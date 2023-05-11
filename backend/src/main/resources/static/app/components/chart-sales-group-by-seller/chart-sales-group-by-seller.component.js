function ChartSalesGroupBySellerComponentController(SaleService) {
    var $ctrl = this;

    $ctrl.salesGroupBySeller = [];

    let chart = Highcharts.chart('sales-group-by-seller', {
        chart: {
            type: 'pie',
        },
        title: {
            text:'Vendas por Vendedor'
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
                name: '',
                colorByPoint: true,
                data: []
            }
        ]
    })

    

    $ctrl.getSalesGroupBySeller = () => {
        SaleService.getSalesGroupBySeller($ctrl.mindate, $ctrl.maxdate).then((response) => {
            if(chart.series.length > 0) {
                while(chart.series.length > 0) {
                    chart.series[0].remove()
                }
            }
            var data = response.data;
            var salesGroupBySeller = []
            data.map(item => salesGroupBySeller.push([item.sellerName, item.sum]));
            console.log(salesGroupBySeller);
            chart.addSeries({
                name: '',
                colorByPoint: true,
                data: []
            })
            chart.series[0].setData(salesGroupBySeller);
        })
    }

    $ctrl.$onInit = () => {
        $ctrl.getSalesGroupBySeller();        
    }

    $ctrl.$onChanges = (mindate, maxdate) => {
        $ctrl.getSalesGroupBySeller(mindate, maxdate)
    }


}


app.component('chartSalesGroupBySeller', {
    templateUrl:'components/chart-sales-group-by-seller/chart-sales-group-by-seller.component.html',
    controller: ChartSalesGroupBySellerComponentController,
    bindings: {
        mindate: '<',
        maxdate: '<'
    }
})