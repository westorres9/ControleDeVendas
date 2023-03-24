function ChartMostSoldProductsComponentController(ProductService) {
    var $ctrl = this;
    let chart = {}

    $ctrl.mostSoldProducts = [];

    chart = Highcharts.chart('most-sold-products', {
        chart: {
            type: 'bar'
        },
        title: {
            text: 'Top 10 produtos mais Vendidos'
        },
        xAxis: {
            type: 'category'
        },
        yAxis: {
            title: {
                text:'Quantidade vendida'
            }
        }, series: []
    })


    $ctrl.getMostSoldProducts = () => {
        ProductService.getMostSoldProducts($ctrl.mindate, $ctrl.maxdate).then((response) => {
            if(chart.series.length > 0) {
                while(chart.series.length > 0) {
                    chart.series[0].remove()
                }
            }
            $ctrl.mostSoldProducts = response.data;
            var data = [];
            $ctrl.mostSoldProducts.map(item => data.push({name: item.name, y: item.quantity} 
             ))
             chart.addSeries({
                name: 'Un Vendidas',
                data: data
             })
            
        })
    }

    $ctrl.$onInit = () => {
    }

    $ctrl.$onChanges = (mindate, maxdate) => {
        $ctrl.getMostSoldProducts(mindate, maxdate);
    }

}

app.component('chartMostSoldProducts', {
    templateUrl: 'components/chart-most-sold-products/chart-most-sold-products.component.html',
    controller: ChartMostSoldProductsComponentController,
    bindings: {
        mindate: '<',
        maxdate: '<'
    }
})