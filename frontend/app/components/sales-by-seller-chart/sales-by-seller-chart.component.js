function SalesBySellerChartController (SaleService) {
    var $ctrl = this;

    $ctrl.sales = [];
    $ctrl.page = [];

    $ctrl.salesBySeller = () => {
        SaleService.getAllSales().then((response) => {
            $ctrl.page = response.data;
            console.log($ctrl.page)
            $ctrl.sales = response.data.content;
            console.log('sale',response.data.content)
            $ctrl.visited = []
            $ctrl.deals = []
            $ctrl.amount = []
            $ctrl.sales.forEach(x => $ctrl.visited.push(x.visited))
            $ctrl.sales.forEach(x => $ctrl.deals.push(x.deals))
            $ctrl.sales.forEach(x => $ctrl.amount.push(x.amount))
            console.log($ctrl.visited)
            Highcharts.chart('sales-by-seller', {
                title: {
                    text: `Vendas do Vendedor ${$ctrl.sales[0].sellerName}`
                },
                subtitle: {
                    text: `periodo de ${$ctrl.sales[0].date}`
                },
                yAxis: {
                    title: 'Vendas'
                },
                legend: {
                    layout: 'vertical',
                    align: 'right',
                    verticalAlign: 'middle'
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false,
                        }
                    }
                },
                series: [
                    {
                        name: 'Visitas',
                        data: $ctrl.visited
                    },
                    {
                        name: 'Vendas',
                        data: $ctrl.deals
                    },
                    {
                        name: 'Vendas',
                        data: $ctrl.deals
                    }

                ], 


            })
        })
    }

    

    $ctrl.$onInit = () => {
        $ctrl.salesBySeller();
        }

}

app.component('salesBySellerChart', {
    templateUrl: 'components/sales-by-seller-chart/sales-by-seller-chart.component.html',
    controller: SalesBySellerChartController,
})