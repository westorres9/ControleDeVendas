function ChartMostSoldProductsComponentController(ProductService) {
    var $ctrl = this;
    var options = {};
    let chart = {}

    $ctrl.mostSoldProducts = [];


    $ctrl.getMostSoldProducts = () => {


        ProductService.getMostSoldProducts().then((response) => {
            $ctrl.mostSoldProducts = response.data;
            var data = [];
            $ctrl.mostSoldProducts.map(item => data.push({name: item.name, y: item.quantity}
                ))
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
                }, series: [
                    {
                        name:  'Quantidade vendida',
                        data: data
                    }
                ]

            })
        })
    }







    $ctrl.$onInit = () => {
        $ctrl.getMostSoldProducts();
    }

}

app.component('chartMostSoldProducts', {
    templateUrl: 'components/chart-most-sold-products/chart-most-sold-products.component.html',
    controller: ChartMostSoldProductsComponentController,
})